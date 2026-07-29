import Link from "next/link";
import { site } from "@/lib/site-config";
import { IconArrow, IconPhone } from "@/components/icons";

export default function CtaBanner() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brick-deep via-brick to-ember p-10 sm:p-14 bg-grain">
      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        <div className="max-w-xl">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-cream leading-tight">
            Не отлагайте ремонта — малките течове често водят до много по-скъпи поправки.
          </h2>
          <p className="mt-3 text-cream/85">
            Получете безплатен оглед преди проблемът да стане по-сериозен.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <Link
            href="/bezplaten-ogled"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-charcoal px-7 py-3.5 font-display font-semibold text-cream hover:bg-charcoal-soft transition-colors"
          >
            Заяви оглед
            <IconArrow className="w-4 h-4" />
          </Link>
          <a
            href={`tel:${site.phones[0].href}`}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/40 px-7 py-3.5 font-display font-semibold text-cream hover:bg-cream/10 transition-colors"
          >
            <IconPhone className="w-4 h-4" />
            {site.phones[0].display}
          </a>
        </div>
      </div>
    </div>
  );
}
