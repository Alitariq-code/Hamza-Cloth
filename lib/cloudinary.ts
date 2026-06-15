import { v2 as cloudinary } from "cloudinary";
import { serverEnv } from "./serverEnv";

const CLOUD_NAME = serverEnv("CLOUDINARY_CLOUD_NAME");
const API_KEY = serverEnv("CLOUDINARY_API_KEY");
const API_SECRET = serverEnv("CLOUDINARY_API_SECRET");

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
  secure: true,
});

export const isCloudinaryConfigured = Boolean(
  CLOUD_NAME && API_KEY && API_SECRET && CLOUD_NAME !== "demo",
);

/** Upload a base64 data-URI (or remote URL) to Cloudinary. */
export async function uploadImage(file: string, folder = "hamza-clothing") {
  const res = await cloudinary.uploader.upload(file, {
    folder,
    resource_type: "image",
    transformation: [{ quality: "auto", fetch_format: "auto" }],
  });
  return { url: res.secure_url, publicId: res.public_id };
}

export async function deleteImage(publicId: string) {
  return cloudinary.uploader.destroy(publicId);
}

export default cloudinary;
