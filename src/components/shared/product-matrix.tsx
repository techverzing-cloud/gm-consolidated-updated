import Image from "next/image";
import { getProductMatrix, type CapacityPeriod } from "@/lib/product-matrix";

interface ProductMatrixProps {
  period: CapacityPeriod;
}

export function ProductMatrix({ period }: ProductMatrixProps) {
  const { eyebrow, subtitle, periods, products } = getProductMatrix();
  const { title } = periods[period];
  const key = `product-matrix-${period}`;

  return (
    <section
      id={key}
      className="scroll-mt-20 bg-gradient-to-br from-[#03465D] to-[#075B7D]"
      aria-labelledby={`${key}-heading`}
    >
      <div className="mx-auto max-w-[1360px] px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
          data-reveal
          data-reveal-stagger
        >
          <span
            data-reveal-child
            className="inline-flex items-center rounded-full border border-white/25 px-4 py-2.5 text-xs font-bold uppercase tracking-[3px] text-white"
          >
            {eyebrow}
          </span>
          <h2
            id={`${key}-heading`}
            data-reveal-child
            className="mt-3 text-balance text-3xl font-bold leading-[1.15] text-white sm:text-4xl lg:text-[42px]"
          >
            {title}
          </h2>
          <p
            data-reveal-child
            className="mt-4 text-pretty text-base leading-relaxed text-[#D0DFE7]"
          >
            {subtitle}
          </p>
        </div>

        <ul
          className="mt-12 flex flex-wrap justify-center gap-3.5"
          data-reveal
        >
          {products.map((product) => (
            <li
              key={product.id}
              className="flex w-61 items-center gap-3 rounded-[13px] border border-white/8 bg-white/7 p-[13px]"
            >
              <span className="flex h-17 w-17 shrink-0 items-center justify-center overflow-hidden rounded-[11px] bg-white">
                <Image
                  src={product.image}
                  alt={product.imageAlt}
                  width={68}
                  height={68}
                  unoptimized={product.image.endsWith(".svg")}
                  className="h-13 w-13 object-contain"
                />
              </span>
              <span className="min-w-0">
                <span className="block text-[22px] font-bold leading-none tracking-tight text-white">
                  {product.quantity[period]}
                </span>
                <span className="mt-1.5 block truncate text-xs font-semibold text-[#D0DFE7]">
                  {product.label}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
