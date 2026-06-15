"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { TrashIcon } from "@/components/Icons";

const MAX = 8;

export default function ImageUploader({
  images,
  onChange,
}: {
  images: string[];
  onChange: (next: string[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const dragIndex = useRef<number | null>(null);

  function fileToDataUri(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function handleFiles(files: FileList | null) {
    if (!files?.length) return;
    setError("");
    const room = MAX - images.length;
    if (room <= 0) {
      setError(`Maximum ${MAX} images.`);
      return;
    }
    const chosen = Array.from(files).slice(0, room);
    setUploading(true);
    const uploaded: string[] = [];

    for (const file of chosen) {
      try {
        const dataUri = await fileToDataUri(file);
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ file: dataUri }),
        });
        if (res.ok) {
          const data = await res.json();
          uploaded.push(data.url);
        } else {
          const data = await res.json().catch(() => ({}));
          // Fallback: keep local preview so the form still works without Cloudinary.
          setError(
            data.error ||
              "Upload service unavailable — using local preview only.",
          );
          uploaded.push(dataUri);
        }
      } catch {
        setError("Failed to read file.");
      }
    }

    onChange([...images, ...uploaded]);
    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  function removeAt(i: number) {
    onChange(images.filter((_, idx) => idx !== i));
  }

  function onDrop(targetIndex: number) {
    const from = dragIndex.current;
    if (from === null || from === targetIndex) return;
    const next = [...images];
    const [moved] = next.splice(from, 1);
    next.splice(targetIndex, 0, moved);
    onChange(next);
    dragIndex.current = null;
  }

  return (
    <div>
      {/* Drop zone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFiles(e.dataTransfer.files);
        }}
        className="flex cursor-pointer flex-col items-center justify-center rounded-card border-2 border-dashed border-blush-border bg-background py-8 text-center transition hover:border-gold"
      >
        <span className="text-3xl">🖼️</span>
        <p className="mt-2 text-sm font-medium text-ink">
          {uploading ? "Uploading…" : "Tap to upload photos"}
        </p>
        <p className="urdu text-sm text-muted" lang="ur" dir="rtl">
          {uploading ? "اپلوڈ ہو رہا ہے…" : "تصویریں شامل کرنے کے لیے یہاں دبائیں"}
        </p>
        <p className="mt-1 text-xs text-muted">
          {images.length}/{MAX} · first photo = main photo · پہلی تصویر مرکزی ہوگی
        </p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {error && <p className="mt-2 text-xs text-badge-red">{error}</p>}

      {/* Previews */}
      {images.length > 0 && (
        <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-6">
          {images.map((img, i) => (
            <div
              key={`${img}-${i}`}
              draggable
              onDragStart={() => (dragIndex.current = i)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => onDrop(i)}
              className="group relative aspect-square cursor-move overflow-hidden rounded-btn border border-blush-border"
            >
              <Image
                src={img}
                alt={`Image ${i + 1}`}
                fill
                sizes="100px"
                className="object-cover"
              />
              {i === 0 && (
                <span className="absolute left-1 top-1 rounded bg-gold px-1.5 py-0.5 text-[9px] font-semibold text-white">
                  MAIN
                </span>
              )}
              <button
                type="button"
                onClick={() => removeAt(i)}
                aria-label="Remove image"
                className="absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white opacity-0 transition group-hover:opacity-100"
              >
                <TrashIcon width={12} height={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
