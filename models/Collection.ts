import mongoose, { Schema, model, models, type Model } from "mongoose";

export interface CollectionDoc {
  name: string;
  slug: string;
  description: string;
  urduTagline?: string;
  coverImage: string;
  type: "season" | "fabric" | "occasion" | "priceRange";
  isVisible: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CollectionSchema = new Schema<CollectionDoc>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, default: "" },
    urduTagline: { type: String, default: "" },
    coverImage: { type: String, default: "" },
    type: {
      type: String,
      enum: ["season", "fabric", "occasion", "priceRange"],
      default: "occasion",
    },
    isVisible: { type: Boolean, default: true, index: true },
  },
  { timestamps: true },
);

const Collection: Model<CollectionDoc> =
  (models.Collection as Model<CollectionDoc>) ||
  model<CollectionDoc>("Collection", CollectionSchema);

export default Collection;
