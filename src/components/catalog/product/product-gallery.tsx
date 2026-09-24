"use client";

import Image from "next/image";
import { useState } from "react";
import type { CatalogImage } from "@/lib/catalog";

export function ProductGallery({ images }: { images: CatalogImage[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = images[activeIndex] ?? images[0];
  const hasThumbnails = images.length > 1;
  const columns =
    images.length === 2
      ? "grid-cols-2"
      : images.length === 4
        ? "grid-cols-4"
        : "grid-cols-3";

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-sm border border-border bg-white">
        <div className="flex items-center justify-center px-8 py-10 sm:px-12 sm:py-14">
          <Image
            key={active.src}
            src={active.src}
            alt={active.alt}
            width={720}
            height={560}
            priority
            className="aspect-[4/3] w-full max-w-lg object-contain"
          />
        </div>
      </div>

      {hasThumbnails ? (
        <ul
          aria-label="Product image thumbnails"
          className={`grid ${columns} gap-4`}
        >
          {images.map((image, index) => {
            const selected = index === activeIndex;
            return (
              <li key={image.src}>
                <button
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Show image ${index + 1}: ${image.alt}`}
                  aria-pressed={selected}
                  className={`group/thumb flex w-full items-center justify-center overflow-hidden rounded-sm border bg-white p-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                    selected
                      ? "border-accent"
                      : "border-border hover:border-foreground-secondary/40"
                  }`}
                >
                  <Image
                    src={image.src}
                    alt=""
                    width={160}
                    height={120}
                    className="aspect-[4/3] w-full object-contain"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}