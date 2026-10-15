import { LogoLoop, type LogoItem } from "@/components/ui/LogoLoop";

type Brand = {
  name: string;
  src: string;
  height: number;
  width: number;
  naturalHeight: number;
};

const BRANDS: Brand[] = [
  { name: "Ajanta", src: "/brand_logos/trimmed/ajanta.png", height: 50, width: 257, naturalHeight: 126 },
  { name: "Amazon", src: "/brand_logos/trimmed/amazon.png", height: 46, width: 894, naturalHeight: 278 },
  { name: "Bajaj", src: "/brand_logos/trimmed/bajaj.png", height: 42, width: 1982, naturalHeight: 484 },
  { name: "Croma", src: "/brand_logos/trimmed/croma.png", height: 50, width: 749, naturalHeight: 398 },
  { name: "Fine Olex", src: "/brand_logos/trimmed/fineOlex.png", height: 46, width: 1000, naturalHeight: 347 },
  { name: "GM Modular", src: "/brand_logos/trimmed/GM_Modular_Logo.png", height: 50, width: 1000, naturalHeight: 507 },
  { name: "Goldmedal", src: "/brand_logos/trimmed/goldmedallogo_loginpage.png", height: 42, width: 4360, naturalHeight: 1127 },
  { name: "Havells", src: "/brand_logos/trimmed/havells.png", height: 46, width: 770, naturalHeight: 525 },
  { name: "Inalsa", src: "/brand_logos/trimmed/inalsa.png", height: 50, width: 889, naturalHeight: 337 },
  { name: "Kenstar", src: "/brand_logos/trimmed/kenstar.png", height: 50, width: 828, naturalHeight: 341 },
  { name: "Maharaja", src: "/brand_logos/trimmed/maharaja.png", height: 46, width: 2041, naturalHeight: 723 },
  { name: "Orient Electric", src: "/brand_logos/trimmed/Orient_Electric_transparent.svg", height: 50, width: 1555, naturalHeight: 565 },
  { name: "Reliance", src: "/brand_logos/trimmed/reliance.png", height: 40, width: 714, naturalHeight: 226 },
  { name: "Sujata", src: "/brand_logos/trimmed/sujata.png", height: 46, width: 733, naturalHeight: 210 },
  { name: "Sunflame", src: "/brand_logos/trimmed/sunflame.png", height: 46, width: 459, naturalHeight: 148 },
  { name: "Surya", src: "/brand_logos/trimmed/surya.png", height: 52, width: 242, naturalHeight: 200 },
  { name: "Syska", src: "/brand_logos/trimmed/syska.png", height: 50, width: 498, naturalHeight: 214 },
  { name: "Venus", src: "/brand_logos/trimmed/venus.png", height: 46, width: 461, naturalHeight: 161 },
  { name: "Wipro", src: "/brand_logos/trimmed/wipro.png", height: 52, width: 2024, naturalHeight: 1644 },
];

const LOGOS: LogoItem[] = BRANDS.map((brand) => ({
  node: (
    <img
      src={brand.src}
      alt={brand.name}
      width={brand.width}
      height={brand.naturalHeight}
      style={{ height: `${brand.height}px` }}
      className="block w-auto scale-120 object-contain"
      draggable={false}
    />
  ),
  title: brand.name,
}));

type BrandsProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
};

export function Brands({
  id = "brands",
  eyebrow = "Brand Partners",
  title = "Built under the brands India already trusts.",
  description = "From national appliance leaders to household electrical names, our lines run under brands recognised across the country.",
}: BrandsProps) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="border-b border-border bg-background"
    >
      <div className="mx-auto max-w-[1320px] px-4 pt-16 sm:px-6 sm:pt-20 lg:px-8 lg:pt-24">
        <div
          className="mx-auto max-w-2xl text-center"
          data-reveal
          data-reveal-stagger
        >
          <p
            data-reveal-child
            className="text-sm font-semibold uppercase tracking-[0.16em] text-accent"
          >
            {eyebrow}
          </p>
          <h2
            id={headingId}
            data-reveal-child
            className="mt-4 text-balance text-3xl font-semibold leading-[1.1] text-foreground sm:text-4xl"
          >
            {title}
          </h2>
          <p
            data-reveal-child
            className="mt-5 text-pretty text-base leading-relaxed text-foreground-secondary sm:text-lg"
          >
            {description}
          </p>
        </div>
      </div>

      <div className="mt-12 pb-16 sm:mt-14 sm:pb-20 lg:pb-24">
        <LogoLoop
          logos={LOGOS}
          logoHeight={52}
          gap={72}
          speed={70}
          pauseOnHover
          scaleOnHover
          fadeOut
          fadeOutColor="#ffffff"
          ariaLabel="Brands we manufacture for"
        />
      </div>
    </section>
  );
}
