import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Collection from "@/models/Collection";
import Product from "@/models/Product";
import { isAdmin } from "@/lib/requireAdmin";
import { slugify } from "@/lib/constants";
import { serialize } from "@/lib/serialize";

interface Params {
  params: { id: string };
}

// PUT /api/collections/[id] — update (admin only)
export async function PUT(req: NextRequest, { params }: Params) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    await dbConnect();
    const body = await req.json();
    if (body.slug) body.slug = slugify(body.slug);
    delete body._id;

    const updated = await Collection.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    }).lean();

    if (!updated) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(serialize(updated));
  } catch (err) {
    console.error("PUT /api/collections/[id]", err);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

// DELETE /api/collections/[id] — delete (admin only)
export async function DELETE(_req: NextRequest, { params }: Params) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    await dbConnect();
    const deleted = await Collection.findByIdAndDelete(params.id).lean();
    if (!deleted) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    // Detach this collection from any products that referenced it.
    await Product.updateMany(
      { collections: params.id },
      { $pull: { collections: params.id } },
    );
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/collections/[id]", err);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
