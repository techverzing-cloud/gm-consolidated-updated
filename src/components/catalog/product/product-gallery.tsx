import Image from "next/image";
import type { CatalogImage } from "@/lib/catalog";

export function ProductGallery({ images }: { images: CatalogImage[] }) {
  const current = images[0];

  return (
    <div className="relative overflow-hidden rounded-sm border border-border bg-white">
      <div className="flex items-center justify-center px-8 py-10 sm:px-12 sm:py-14">
        <Image
          src={current.src}
          alt={current.alt}
          width={720}
          height={560}
          priority
          className="aspect-[4/3] w-full max-w-lg object-contain"
        />
      </div>
    </div>
  );
}