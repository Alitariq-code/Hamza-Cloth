import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import { isAdmin } from "@/lib/requireAdmin";
import { slugify } from "@/lib/constants";
import { serialize } from "@/lib/serialize";

export const dynamic = "force-dynamic";

// GET /api/products — list with filters, sort, pagination
export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;

  try {
    await dbConnect();

    const admin = await isAdmin();
    const filter: Record<string, unknown> = {};

    // Public callers only ever see visible products.
    if (!admin) filter.isVisible = true;
    else if (sp.get("visible") === "false") filter.isVisible = false;

    if (sp.get("season")) filter.season = sp.get("season")!;
    if (sp.get("fabric")) filter.fabric = sp.get("fabric")!;
    if (sp.get("category")) filter.category = sp.get("category")!;
    if (sp.get("priceRange")) filter.priceRange = sp.get("priceRange")!;
    if (sp.get("collection")) filter.collections = sp.get("collection")!;
    if (sp.get("isNewArrival") === "true") filter.isNewArrival = true;
    if (sp.get("isFeatured") === "true") filter.isFeatured = true;
    if (sp.get("isOnSale") === "true") filter.isOnSale = true;
    if (sp.get("search")) {
      const rx = new RegExp(
        sp.get("search")!.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        "i",
      );
      filter.$or = [{ name: rx }, { description: rx }, { fabric: rx }];
    }

    const sortParam = sp.get("sort");
    const sort: Record<string, 1 | -1> =
      sortParam === "price-asc"
        ? { price: 1 }
        : sortParam === "price-desc"
          ? { price: -1 }
          : sortParam === "featured"
            ? { isFeatured: -1, createdAt: -1 }
            : { createdAt: -1 };

    const page = Math.max(1, Number(sp.get("page")) || 1);
    const limit = Math.min(100, Number(sp.get("limit")) || 12);

    const [docs, total] = await Promise.all([
      Product.find(filter)
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Product.countDocuments(filter),
    ]);

    return NextResponse.json({
      products: serialize(docs),
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error("GET /api/products", err);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}

// POST /api/products — create (admin only)
export async function POST(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    await dbConnect();
    const body = await req.json();

    if (!body.name || body.price == null) {
      return NextResponse.json(
        { error: "Name and price are required" },
        { status: 400 },
      );
    }

    const slug = body.slug ? slugify(body.slug) : slugify(body.name);
    const exists = await Product.findOne({ slug });
    const finalSlug = exists ? `${slug}-${Date.now().toString(36)}` : slug;

    const product = await Product.create({ ...body, slug: finalSlug });
    return NextResponse.json(serialize(product.toObject()), { status: 201 });
  } catch (err) {
    console.error("POST /api/products", err);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 },
    );
  }
}
