"use client";

import Link from "next/link";
import { useState } from "react";
import { nav, site } from "@/lib/site-config";
import { IconArrow, IconPhone, IconViber } from "@/components/icons";
import Logo from "@/components/Logo";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="hidden md:flex items-center justify-between gap-4 bg-charcoal-soft border-b border-line px-6 lg:px-10 py-2 text-xs text-cream-dim">
        <span className="font-medium tracking-wide">{site.coverage}</span>
        <div className="flex items-center gap-5">
          {site.phones.map((p) => (
            <a
              key={p.href}
              href={`tel:${p.href}`}
              className="flex items-center gap-1.5 hover:text-amber transition-colors"
            >
              <IconPhone className="w-3.5 h-3.5" />
              {p.display}
            </a>
          ))}
          <a
            href={site.viberHref}
            className="flex items-center gap-1.5 hover:text-amber transition-colors"
          >
            <IconViber className="w-3.5 h-3.5" />
            Viber
          </a>
        </div>
      </div>

      <div className="bg-charcoal/95 backdrop-blur border-b border-line">
        <div className="flex items-center justify-between px-6 lg:px-10 py-4">
          <Link href="/" className="flex items-center gap-2.5 shrink-0" onClick={() => setOpen(false)}>
            <Logo className="w-8 h-8 sm:w-9 sm:h-9 shrink-0" />
            <span className="font-display font-bold text-lg sm:text-xl tracking-tight text-cream">
              Грийнхаус<span className="text-gradient"> Агро</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-cream-dim hover:text-cream transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/bezplaten-ogled" className="btn-primary hidden sm:inline-flex text-sm !py-2.5 !px-5">
              Безплатен оглед
              <IconArrow className="w-4 h-4" />
            </Link>
            <button
              type="button"
              aria-label="Меню"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 border border-line rounded-full"
            >
              <span
                className={`block h-[1.5px] w-5 bg-cream transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`}
              />
              <span
                className={`block h-[1.5px] w-5 bg-cream transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
              />
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden border-t border-line px-6 py-5 flex flex-col gap-4 bg-charcoal">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-cream-dim hover:text-cream"
              >
                {item.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-2 border-t border-line">
              {site.phones.map((p) => (
                <a key={p.href} href={`tel:${p.href}`} className="flex items-center gap-2 text-cream-dim">
                  <IconPhone className="w-4 h-4" /> {p.display}
                </a>
              ))}
            </div>
            <Link
              href="/bezplaten-ogled"
              onClick={() => setOpen(false)}
              className="btn-primary justify-center mt-2"
            >
              Безплатен оглед
              <IconArrow className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
