export type Fabric = "Lawn" | "Chiffon" | "Silk" | "Khaddar" | "Other";
export type Category = "Casual" | "Formal" | "Party" | "Bridal";
export type Season = "Summer" | "Winter" | "Eid" | "All Season";
export type PriceRange = "Budget" | "Mid" | "Premium";
export type CollectionType = "season" | "fabric" | "occasion" | "priceRange";

export interface ICollection {
  _id: string;
  name: string;
  slug: string;
  description: string;
  urduTagline?: string;
  coverImage: string;
  type: CollectionType;
  isVisible: boolean;
  itemCount?: number;
  createdAt: string;
  updatedAt?: string;
}

export interface IProduct {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  salePrice?: number;
  images: string[];
  fabric: Fabric;
  sizes: string[];
  colors: string[];
  category: Category;
  season: Season;
  priceRange: PriceRange;
  isNewArrival: boolean;
  isFeatured: boolean;
  isOnSale: boolean;
  isVisible: boolean;
  collections: string[] | ICollection[];
  whatsappMessage: string;
  createdAt: string;
  updatedAt: string;
}

export interface ISettings {
  announcementEnabled: boolean;
  announcementText: string;
  heroImage: string;
  heroBadgeTitle: string;
  heroBadgeSubtitle: string;
}

export interface ProductQuery {
  season?: Season;
  fabric?: Fabric;
  category?: Category;
  priceRange?: PriceRange;
  collection?: string;
  search?: string;
  isNewArrival?: boolean;
  isFeatured?: boolean;
  isOnSale?: boolean;
  sort?: "newest" | "price-asc" | "price-desc" | "featured";
  page?: number;
  limit?: number;
}

export interface PaginatedProducts {
  products: IProduct[];
  total: number;
  page: number;
  pages: number;
}

export const FABRICS: Fabric[] = ["Lawn", "Chiffon", "Silk", "Khaddar", "Other"];
export const CATEGORIES: Category[] = ["Casual", "Formal", "Party", "Bridal"];
export const SEASONS: Season[] = ["Summer", "Winter", "Eid", "All Season"];
export const PRICE_RANGES: PriceRange[] = ["Budget", "Mid", "Premium"];
export const SIZE_OPTIONS = ["XS", "S", "M", "L", "XL", "XXL", "Custom"];
export const COLLECTION_TYPES: CollectionType[] = [
  "season",
  "fabric",
  "occasion",
  "priceRange",
];
