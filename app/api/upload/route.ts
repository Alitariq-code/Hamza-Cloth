import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/requireAdmin";
import { uploadImage, isCloudinaryConfigured } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";
// Allow larger payloads for base64 images.
export const maxDuration = 30;

// POST /api/upload — accepts JSON { file: dataURI } or multipart form-data.
export async function POST(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isCloudinaryConfigured) {
    return NextResponse.json(
      {
        error:
          "Cloudinary is not configured. Set CLOUDINARY_* env vars to enable uploads.",
      },
      { status: 503 },
    );
  }

  try {
    const contentType = req.headers.get("content-type") || "";
    let dataUri: string | null = null;

    if (contentType.includes("application/json")) {
      const body = await req.json();
      dataUri = body.file || null;
    } else {
      const form = await req.formData();
      const file = form.get("file");
      if (file instanceof File) {
        const buffer = Buffer.from(await file.arrayBuffer());
        dataUri = `data:${file.type};base64,${buffer.toString("base64")}`;
      }
    }

    if (!dataUri) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const result = await uploadImage(dataUri);
    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    console.error("POST /api/upload", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
