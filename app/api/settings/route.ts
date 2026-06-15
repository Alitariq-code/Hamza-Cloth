import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import dbConnect from "@/lib/mongodb";
import Settings from "@/models/Settings";
import { isAdmin } from "@/lib/requireAdmin";
import { SETTINGS_DEFAULTS } from "@/lib/constants";

export const dynamic = "force-dynamic";

const FIELDS = [
  "announcementEnabled",
  "announcementText",
  "heroImage",
  "heroBadgeTitle",
  "heroBadgeSubtitle",
] as const;

// GET /api/settings — public site settings (merged with defaults)
export async function GET() {
  try {
    await dbConnect();
    const doc = await Settings.findOne({ key: "site" }).lean();
    return NextResponse.json({
      announcementEnabled:
        doc?.announcementEnabled ?? SETTINGS_DEFAULTS.announcementEnabled,
      announcementText:
        doc?.announcementText || SETTINGS_DEFAULTS.announcementText,
      heroImage: doc?.heroImage || SETTINGS_DEFAULTS.heroImage,
      heroBadgeTitle: doc?.heroBadgeTitle || SETTINGS_DEFAULTS.heroBadgeTitle,
      heroBadgeSubtitle:
        doc?.heroBadgeSubtitle || SETTINGS_DEFAULTS.heroBadgeSubtitle,
    });
  } catch (err) {
    console.error("GET /api/settings", err);
    return NextResponse.json(SETTINGS_DEFAULTS);
  }
}

// PUT /api/settings — update site settings (admin only)
export async function PUT(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    await dbConnect();
    const body = await req.json();

    const update: Record<string, unknown> = {};
    for (const f of FIELDS) {
      if (f in body) update[f] = body[f];
    }

    const doc = await Settings.findOneAndUpdate(
      { key: "site" },
      { $set: update, $setOnInsert: { key: "site" } },
      { upsert: true, new: true, runValidators: true },
    ).lean();

    // Refresh every page that uses the root layout (announcement + hero).
    revalidatePath("/", "layout");

    return NextResponse.json(doc);
  } catch (err) {
    console.error("PUT /api/settings", err);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
