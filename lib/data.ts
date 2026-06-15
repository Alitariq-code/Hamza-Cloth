import "server-only";
import dbConnect from "./mongodb";
import Product from "@/models/Product";
import Collection from "@/models/Collection";
import Settings from "@/models/Settings";
import { serialize } from "./serialize";
import { SETTINGS_DEFAULTS } from "./constants";
import type {
  IProduct,
  ICollection,
  ISettings,
  ProductQuery,
  PaginatedProducts,
} from "@/types";

/**
 * Data-access helpers used by Server Components. They query MongoDB and, on a
 * connection error, return empty results so pages still render their empty
 * states instead of crashing.
 */

function sortStage(sort?: ProductQuery["sort"]): Record<string, 1 | -1> {
  switch (sort) {
    case "price-asc":
      return { price: 1 };
    case "price-desc":
      return { price: -1 };
    case "featured":
      return { isFeatured: -1, createdAt: -1 };
    default:
      return { createdAt: -1 };
  }
}

export async function getProducts(
  query: ProductQuery = {},
): Promise<PaginatedProducts> {
  const page = Math.max(1, query.page || 1);
  const limit = query.limit || 12;

  try {
    await dbConnect();

    const filter: Record<string, unknown> = { isVisible: true };
    if (query.season) filter.season = query.season;
    if (query.fabric) filter.fabric = query.fabric;
    if (query.category) filter.category = query.category;
    if (query.priceRange) filter.priceRange = query.priceRange;
    if (query.isNewArrival) filter.isNewArrival = true;
    if (query.isFeatured) filter.isFeatured = true;
    if (query.isOnSale) filter.isOnSale = true;
    if (query.collection) filter.collections = query.collection;
    if (query.search) {
      const rx = new RegExp(escapeRegex(query.search), "i");
      filter.$or = [{ name: rx }, { description: rx }, { fabric: rx }];
    }

    const [docs, total] = await Promise.all([
      Product.find(filter)
        .sort(sortStage(query.sort))
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Product.countDocuments(filter),
    ]);

    return {
      products: serialize<IProduct[]>(docs),
      total,
      page,
      pages: Math.ceil(total / limit),
    };
  } catch (err) {
    console.error("getProducts failed:", err);
    return { products: [], total: 0, page, pages: 0 };
  }
}

export async function getProductBySlug(
  slug: string,
): Promise<IProduct | null> {
  try {
    await dbConnect();
    const doc = await Product.findOne({ slug, isVisible: true })
      .populate("collections", "name slug")
      .lean();
    return doc ? serialize<IProduct>(doc) : null;
  } catch (err) {
    console.error("getProductBySlug failed:", err);
    return null;
  }
}

export async function getRelatedProducts(
  product: IProduct,
  limit = 4,
): Promise<IProduct[]> {
  try {
    await dbConnect();
    const docs = await Product.find({
      _id: { $ne: product._id },
      isVisible: true,
      $or: [{ category: product.category }, { fabric: product.fabric }],
    })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();
    return serialize<IProduct[]>(docs);
  } catch (err) {
    console.error("getRelatedProducts failed:", err);
    return [];
  }
}

export async function getCollections(
  withCounts = true,
): Promise<ICollection[]> {
  try {
    await dbConnect();
    const docs = await Collection.find({ isVisible: true })
      .sort({ createdAt: -1 })
      .lean();
    const collections = serialize<ICollection[]>(docs);

    if (withCounts) {
      await Promise.all(
        collections.map(async (c) => {
          c.itemCount = await Product.countDocuments({
            collections: c._id,
            isVisible: true,
          });
        }),
      );
    }
    return collections;
  } catch (err) {
    console.error("getCollections failed:", err);
    return [];
  }
}

export async function getCollectionBySlug(
  slug: string,
): Promise<ICollection | null> {
  try {
    await dbConnect();
    const doc = await Collection.findOne({ slug, isVisible: true }).lean();
    return doc ? serialize<ICollection>(doc) : null;
  } catch (err) {
    console.error("getCollectionBySlug failed:", err);
    return null;
  }
}

export async function getSettings(): Promise<ISettings> {
  try {
    await dbConnect();
    const doc = await Settings.findOne({ key: "site" }).lean();
    if (!doc) return SETTINGS_DEFAULTS;
    // Merge with defaults so any blank field falls back to a sensible value.
    return {
      announcementEnabled:
        doc.announcementEnabled ?? SETTINGS_DEFAULTS.announcementEnabled,
      announcementText:
        doc.announcementText || SETTINGS_DEFAULTS.announcementText,
      heroImage: doc.heroImage || SETTINGS_DEFAULTS.heroImage,
      heroBadgeTitle: doc.heroBadgeTitle || SETTINGS_DEFAULTS.heroBadgeTitle,
      heroBadgeSubtitle:
        doc.heroBadgeSubtitle || SETTINGS_DEFAULTS.heroBadgeSubtitle,
    };
  } catch (err) {
    console.error("getSettings failed:", err);
    return SETTINGS_DEFAULTS;
  }
}

function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
