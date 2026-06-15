import { Schema, model, models, Types, type Model } from "mongoose";

export interface ProductDoc {
  name: string;
  slug: string;
  description: string;
  price: number;
  salePrice?: number;
  images: string[];
  fabric: "Lawn" | "Chiffon" | "Silk" | "Khaddar" | "Other";
  sizes: string[];
  colors: string[];
  category: "Casual" | "Formal" | "Party" | "Bridal";
  season: "Summer" | "Winter" | "Eid" | "All Season";
  priceRange: "Budget" | "Mid" | "Premium";
  isNewArrival: boolean;
  isFeatured: boolean;
  isOnSale: boolean;
  isVisible: boolean;
  collections: Types.ObjectId[];
  whatsappMessage: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<ProductDoc>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true, min: 0 },
    salePrice: { type: Number, min: 0 },
    images: { type: [String], default: [] },
    fabric: {
      type: String,
      enum: ["Lawn", "Chiffon", "Silk", "Khaddar", "Other"],
      default: "Lawn",
      index: true,
    },
    sizes: { type: [String], default: [] },
    colors: { type: [String], default: [] },
    category: {
      type: String,
      enum: ["Casual", "Formal", "Party", "Bridal"],
      default: "Casual",
      index: true,
    },
    season: {
      type: String,
      enum: ["Summer", "Winter", "Eid", "All Season"],
      default: "All Season",
      index: true,
    },
    priceRange: {
      type: String,
      enum: ["Budget", "Mid", "Premium"],
      default: "Mid",
      index: true,
    },
    isNewArrival: { type: Boolean, default: false, index: true },
    isFeatured: { type: Boolean, default: false, index: true },
    isOnSale: { type: Boolean, default: false, index: true },
    isVisible: { type: Boolean, default: true, index: true },
    collections: [{ type: Schema.Types.ObjectId, ref: "Collection" }],
    whatsappMessage: { type: String, default: "" },
  },
  { timestamps: true },
);

// Text index to power the search page (name, description, fabric).
ProductSchema.index({ name: "text", description: "text", fabric: "text" });

const Product: Model<ProductDoc> =
  (models.Product as Model<ProductDoc>) ||
  model<ProductDoc>("Product", ProductSchema);

export default Product;
