import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const isCloudinaryConfigured = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET &&
    process.env.CLOUDINARY_CLOUD_NAME !== "demo",
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
