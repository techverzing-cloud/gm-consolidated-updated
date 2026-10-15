import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

const TRUST_INDICATORS = [
  { icon: "lucide:calendar-check", label: "Since 1983" },
  { icon: "lucide:award", label: "ISO 9001:2015" },
  { icon: "lucide:shield-check", label: "BIS licensed lines" },
  { icon: "lucide:flask-conical", label: "In-house test lab" },
];

export function OversizedProductHero() {
  return (
    <section
      id="home-hero"
      data-hero
      aria-labelledby="home-hero-title"
      className="relative isolate flex flex-col overflow-hidden bg-navy-deep lg:min-h-[calc(100dvh-4.5rem)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 [background:radial-gradient(120%_95%_at_82%_18%,rgba(46,95,158,0.34),transparent_58%),radial-gradient(90%_80%_at_8%_92%,rgba(22,74,150,0.22),transparent_60%)]"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1320px] flex-1 items-center px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="order-1 lg:col-span-8 lg:col-start-1 lg:row-start-1 lg:pr-10">
            <h1
              id="home-hero-title"
              className="text-[clamp(2.75rem,13vw,4.5rem)] font-bold uppercase leading-[0.9] tracking-[-0.03em] text-white lg:text-[clamp(4rem,5.5vw,5.25rem)]"
            >
              <span className="block">Quick Dry.</span>
              <span className="block text-accent-tint">Bold Style.</span>
            </h1>
          </div>

          <div className="order-2 lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1 lg:-ml-12 lg:self-center">
            <div className="relative z-20 mx-auto w-full max-w-[340px] sm:max-w-[400px] lg:max-w-none">
              <Image
                src="/images/products/personal-care/gm44.png"
                alt="G.M. Consolidated hair dryer — an in-house manufactured personal-care appliance"
                width={937}
                height={812}
                priority
                sizes="(min-width: 1024px) 46vw, (min-width: 640px) 400px, 340px"
                className="h-auto w-full object-contain drop-shadow-[0_28px_50px_rgba(6,23,51,0.6)]"
              />
            </div>
          </div>

          <div className="order-3 lg:col-span-7 lg:col-start-1 lg:row-start-2 lg:pr-10">
            <p className="max-w-xl text-pretty text-base leading-relaxed text-navy-muted sm:text-lg">
              Dry irons, steam irons, storage geysers, fan heaters, hair dryers
              and rechargeable mosquito rackets — designed, tooled and built
              in-house across two ISO-certified manufacturing units in Kala Amb,
              Himachal Pradesh. OEM, ODM and private label, under your brand.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/catalog"
                className="btn-navy-solid px-7 py-3.5 text-sm sm:text-base"
              >
                Explore Products
                <Icon icon="lucide:arrow-right" size={16} />
              </Link>
              <Link
                href="/contact#enquiry"
                className="btn-navy-ghost px-7 py-3.5 text-sm sm:text-base"
              >
                Request Enquiry
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/10">
        <ul className="mx-auto flex max-w-[1320px] flex-wrap gap-x-8 gap-y-3 px-4 py-6 sm:px-6 lg:px-8">
          {TRUST_INDICATORS.map((item) => (
            <li
              key={item.label}
              className="flex items-center gap-2 text-sm text-navy-muted"
            >
              <Icon
                icon={item.icon}
                size={16}
                className="shrink-0 text-accent-tint"
              />
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
