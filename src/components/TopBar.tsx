import { Icon } from "@/components/ui/Icon";
import { SITE_INFO, SOCIALS } from "@/data/site";

export function TopBar() {
  return (
    <div className="hidden bg-accent text-white md:block">
      <div className="mx-auto flex h-10 max-w-[1320px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-5 sm:gap-7">
          <a
            href={`tel:${SITE_INFO.phone.replace(/[^+\d]/g, "")}`}
            className="flex items-center gap-2 text-xs font-medium text-white/90 transition-[color,opacity] duration-200 hover:text-white sm:text-[13px]"
          >
            <Icon icon="mdi:phone-outline" size={16} />
            {SITE_INFO.phone}
          </a>
          <a
            href={`mailto:${SITE_INFO.email}`}
            className="flex items-center gap-2 text-xs font-medium text-white/90 transition-[color,opacity] duration-200 hover:text-white sm:text-sm"
          >
            <Icon icon="mdi:email-outline" size={16} />
            {SITE_INFO.email}
          </a>
        </div>

        <div className="flex items-center gap-1">
          {SOCIALS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              aria-label={`G.M. Consolidated on ${social.label}`}
              className="flex h-8 w-8 items-center justify-center rounded-sm text-white/90 transition-[color,opacity] duration-200 hover:text-accent-tint hover:opacity-100"
            >
              <Icon icon={social.icon} size={16} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}