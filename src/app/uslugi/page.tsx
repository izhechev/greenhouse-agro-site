import Link from "next/link";
import type { Metadata } from "next";
import { services, site } from "@/lib/site-config";
import PageHero from "@/components/PageHero";
import CtaBanner from "@/components/CtaBanner";
import {
  IconArrow,
  IconBuild,
  IconCanopy,
  IconCheck,
  IconDrop,
  IconRoof,
  IconSheet,
  IconTile,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Услуги и Дейности",
  description:
    "Пълен ремонт на покриви, пренареждане на керемиди, изграждане на нов покрив, хидроизолация, тенекеджийски услуги и навеси — с гаранция, в цяла България.",
  alternates: { canonical: "/uslugi" },
};

const iconMap = {
  roof: IconRoof,
  tile: IconTile,
  build: IconBuild,
  drop: IconDrop,
  sheet: IconSheet,
  canopy: IconCanopy,
};

export default function UslugiPage() {
  return (
    <>
      <PageHero
        eyebrow="Какво предлагаме"
        title="Услуги и дейности"
        subtitle="Покривът е най-важната защита на вашия дом. Затова предлагаме пълния набор от дейности, необходими за неговата поддръжка, ремонт и изграждане."
        crumb="Услуги и Дейности"
      />

      <section className="bg-charcoal py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-10 flex flex-col gap-20 sm:gap-28">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon];
            const reversed = i % 2 === 1;
            return (
              <div
                key={service.id}
                id={service.slug}
                className="scroll-mt-28 grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start"
              >
                <div className={reversed ? "lg:order-2" : ""}>
                  <div className="w-16 h-16 rounded-2xl bg-charcoal-card border border-line flex items-center justify-center">
                    <Icon className="w-8 h-8 text-amber" />
                  </div>
                  <span className="mt-6 block font-display text-xs text-cream-dim/60">
                    {String(i + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                  </span>
                  <h2 className="mt-2 font-display font-bold text-2xl sm:text-3xl text-cream leading-tight">
                    {service.title}
                  </h2>
                </div>
                <div className={reversed ? "lg:order-1" : ""}>
                  <p className="text-cream-dim leading-relaxed">{service.long}</p>
                  <ul className="mt-6 grid sm:grid-cols-2 gap-3">
                    {service.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-sm text-cream-dim">
                        <IconCheck className="w-4 h-4 text-amber mt-0.5 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <Link href="/bezplaten-ogled" className="btn-primary text-sm !py-2.5 !px-5">
                      Изпрати запитване
                      <IconArrow className="w-4 h-4" />
                    </Link>
                    <a href={`tel:${site.phones[0].href}`} className="btn-outline text-sm !py-2.5 !px-5">
                      {site.phones[0].display}
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-charcoal-soft border-t border-line py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <CtaBanner />
        </div>
      </section>
    </>
  );
}
