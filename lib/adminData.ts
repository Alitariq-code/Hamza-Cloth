import "server-only";
import dbConnect from "./mongodb";
import Collection from "@/models/Collection";
import Product from "@/models/Product";
import { serialize } from "./serialize";
import type { ICollection, IProduct } from "@/types";

/** All collections (including hidden) for admin selectors. */
export async function getAllCollections(): Promise<ICollection[]> {
  try {
    await dbConnect();
    const docs = await Collection.find({}).sort({ createdAt: -1 }).lean();
    return serialize<ICollection[]>(docs);
  } catch {
    return [];
  }
}

export async function getProductById(id: string): Promise<IProduct | null> {
  try {
    await dbConnect();
    const doc = await Product.findById(id).lean();
    return doc ? serialize<IProduct>(doc) : null;
  } catch {
    return null;
  }
}
