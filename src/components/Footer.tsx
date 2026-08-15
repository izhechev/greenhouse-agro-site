import Link from "next/link";
import { nav, site } from "@/lib/site-config";
import { IconPhone, IconViber } from "@/components/icons";
import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="bg-charcoal-soft border-t border-line">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <span className="flex items-center gap-2.5 font-display font-bold text-lg text-cream">
            <Logo className="w-8 h-8 shrink-0" />
            <span>
              Грийнхаус<span className="text-gradient"> Агро</span>
            </span>
          </span>
          <p className="mt-3 text-sm text-cream-dim leading-relaxed">
            Ремонт на покриви в цяла България. Собствен екип, доказани материали и писмена гаранция за всеки обект.
          </p>
        </div>

        <div>
          <h3 className="section-eyebrow mb-4">Навигация</h3>
          <ul className="space-y-2.5">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-cream-dim hover:text-amber transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/bezplaten-ogled" className="text-sm text-cream-dim hover:text-amber transition-colors">
                Безплатен оглед
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="section-eyebrow mb-4">Контакти</h3>
          <ul className="space-y-2.5 text-sm text-cream-dim">
            {site.phones.map((p) => (
              <li key={p.href}>
                <a href={`tel:${p.href}`} className="flex items-center gap-2 hover:text-amber transition-colors">
                  <IconPhone className="w-4 h-4" /> {p.display}
                </a>
              </li>
            ))}
            <li>
              <a href={site.viberHref} className="flex items-center gap-2 hover:text-amber transition-colors">
                <IconViber className="w-4 h-4" /> Viber
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-amber transition-colors">
                {site.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="section-eyebrow mb-4">Правно</h3>
          <ul className="space-y-2.5">
            <li>
              <Link href="/politika-za-poveritelnost" className="text-sm text-cream-dim hover:text-amber transition-colors">
                Политика на поверителност
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-6 text-xs text-cream-dim/70">
          © {new Date().getFullYear()} {site.legalName}. Всички права запазени.
        </div>
      </div>
    </footer>
  );
}
