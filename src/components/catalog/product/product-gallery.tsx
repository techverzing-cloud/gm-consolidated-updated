"use client";

import { useState } from "react";
import Image from "next/image";
import type { CatalogImage } from "@/lib/catalog";

export function ProductGallery({ images }: { images: CatalogImage[] }) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  return (
    <div className="flex flex-col gap-4">
      <div className="relative overflow-hidden rounded-sm border border-border bg-white">
        <div
          key={current.src}
          className="flex items-center justify-center px-8 py-10 sm:px-12 sm:py-14"
        >
          <Image
            src={current.src}
            alt={current.alt}
            width={720}
            height={560}
            priority={active === 0}
            className="aspect-[4/3] w-full max-w-lg object-contain"
          />
        </div>
      </div>

      {images.length > 1 ? (
        <div
          className="flex flex-wrap gap-3"
          role="tablist"
          aria-label="Product images"
        >
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-label={`Show image ${index + 1}: ${image.alt}`}
              onClick={() => setActive(index)}
              className={`relative aspect-square w-16 items-center justify-center overflow-hidden rounded-sm border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                index === active
                  ? "border-accent bg-white"
                  : "border-border bg-background-alt hover:border-foreground-secondary/60"
              }`}
            >
              <Image
                src={image.src}
                alt=""
                width={96}
                height={96}
                className="h-full w-full object-contain p-1.5"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}