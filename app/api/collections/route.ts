import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Collection from "@/models/Collection";
import Product from "@/models/Product";
import { isAdmin } from "@/lib/requireAdmin";
import { slugify } from "@/lib/constants";
import { serialize } from "@/lib/serialize";

export const dynamic = "force-dynamic";

// GET /api/collections
export async function GET() {
  try {
    await dbConnect();
    const admin = await isAdmin();
    const filter = admin ? {} : { isVisible: true };
    const docs = await Collection.find(filter).sort({ createdAt: -1 }).lean();

    const collections = serialize<Array<Record<string, unknown> & { _id: string }>>(docs);
    await Promise.all(
      collections.map(async (c) => {
        c.itemCount = await Product.countDocuments({
          collections: c._id,
          isVisible: true,
        });
      }),
    );

    return NextResponse.json(collections);
  } catch (err) {
    console.error("GET /api/collections", err);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

// POST /api/collections — create (admin only)
export async function POST(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    await dbConnect();
    const body = await req.json();
    if (!body.name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    const slug = body.slug ? slugify(body.slug) : slugify(body.name);
    const exists = await Collection.findOne({ slug });
    const finalSlug = exists ? `${slug}-${Date.now().toString(36)}` : slug;

    const created = await Collection.create({ ...body, slug: finalSlug });
    return NextResponse.json(serialize(created.toObject()), { status: 201 });
  } catch (err) {
    console.error("POST /api/collections", err);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}
