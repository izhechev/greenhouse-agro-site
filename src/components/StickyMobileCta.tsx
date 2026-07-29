import { site } from "@/lib/site-config";
import { IconPhone, IconViber } from "@/components/icons";
import Link from "next/link";

export default function StickyMobileCta() {
  return (
    <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 grid grid-cols-3 border-t border-line bg-charcoal-soft/95 backdrop-blur">
      <a
        href={`tel:${site.phones[0].href}`}
        className="flex flex-col items-center justify-center gap-1 py-3 text-cream-dim text-[11px] font-medium border-r border-line"
      >
        <IconPhone className="w-4 h-4" />
        Обади се
      </a>
      <Link
        href="/bezplaten-ogled"
        className="flex flex-col items-center justify-center gap-1 py-3 text-[11px] font-semibold bg-gradient-to-r from-amber to-ember text-charcoal"
      >
        Безплатен оглед
      </Link>
      <a
        href={site.viberHref}
        className="flex flex-col items-center justify-center gap-1 py-3 text-cream-dim text-[11px] font-medium border-l border-line"
      >
        <IconViber className="w-4 h-4" />
        Viber
      </a>
    </div>
  );
}
