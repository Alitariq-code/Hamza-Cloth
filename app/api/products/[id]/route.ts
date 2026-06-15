import { NextRequest, NextResponse } from "next/server";
import { isValidObjectId } from "mongoose";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import { isAdmin } from "@/lib/requireAdmin";
import { slugify } from "@/lib/constants";
import { serialize } from "@/lib/serialize";

interface Params {
  params: { id: string };
}

// GET /api/products/[id] — supports both ObjectId and slug
export async function GET(_req: NextRequest, { params }: Params) {
  try {
    await dbConnect();
    const query = isValidObjectId(params.id)
      ? { _id: params.id }
      : { slug: params.id };
    const product = await Product.findOne(query)
      .populate("collections", "name slug")
      .lean();

    if (!product) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(serialize(product));
  } catch (err) {
    console.error("GET /api/products/[id]", err);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

// PUT /api/products/[id] — update (admin only)
export async function PUT(req: NextRequest, { params }: Params) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    await dbConnect();
    const body = await req.json();
    if (body.slug) body.slug = slugify(body.slug);
    delete body._id;

    const updated = await Product.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    }).lean();

    if (!updated) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(serialize(updated));
  } catch (err) {
    console.error("PUT /api/products/[id]", err);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

// DELETE /api/products/[id] — delete (admin only)
export async function DELETE(_req: NextRequest, { params }: Params) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    await dbConnect();
    const deleted = await Product.findByIdAndDelete(params.id).lean();
    if (!deleted) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/products/[id]", err);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
