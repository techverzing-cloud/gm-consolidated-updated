import type { AboutCompanyProfile, AboutFact } from "@/lib/about";

interface CompanyProfileProps {
  profile: AboutCompanyProfile;
  facts: AboutFact[];
}

export function CompanyProfile({ profile, facts }: CompanyProfileProps) {
  const foundingYear =
    facts.find((fact) => /^\d+$/.test(fact.value))?.value ?? "1983";

  return (
    <section
      id="about-profile"
      className="bg-white"
      aria-labelledby="profile-title"
    >
      <div className="mx-auto max-w-[1320px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div data-about-profile className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
              {profile.eyebrow}
            </p>
            <p className="mt-10 text-[96px] font-semibold leading-none tracking-tight text-foreground sm:mt-14 sm:text-[128px]">
              {foundingYear}
            </p>
            <div className="mt-8 h-px w-24 bg-accent" />
          </div>

          <div className="lg:col-span-7">
            <h2
              id="profile-title"
              className="text-balance text-3xl font-semibold leading-[1.15] text-foreground sm:text-4xl"
            >
              {profile.title}
            </h2>
            <div className="mt-7 max-w-3xl space-y-5">
              {profile.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-pretty text-base leading-relaxed text-foreground-secondary sm:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}