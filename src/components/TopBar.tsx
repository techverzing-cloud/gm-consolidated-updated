import { Icon } from "@/components/ui/Icon";
import { SITE_INFO } from "@/data/site";

export function TopBar() {
  return (
    <div className="hidden bg-accent text-white md:block">
      <div className="mx-auto flex h-10 max-w-[1320px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-5 sm:gap-7">
          <a
            href={`tel:${SITE_INFO.phone.replace(/[^+\d]/g, "")}`}
            className="flex items-center gap-2 text-xs font-medium text-white/90 transition-[color,opacity] duration-200 hover:text-white sm:text-[13px]"
          >
            <Icon icon="lucide:phone" size={16} />
            {SITE_INFO.phone}
          </a>
        </div>
        <div className="flex items-center gap-5 sm:gap-7">
          <a
            href={`mailto:${SITE_INFO.supportEmail}`}
            className="flex items-center gap-2 text-xs font-medium text-white/90 transition-[color,opacity] duration-200 hover:text-white sm:text-sm"
          >
            <Icon icon="lucide:mail" size={16} />
            {SITE_INFO.supportEmail}
          </a>
        </div>
      </div>
    </div>
  );
}
