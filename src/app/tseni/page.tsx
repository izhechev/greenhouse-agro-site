import Link from "next/link";
import type { Metadata } from "next";
import { services, site } from "@/lib/site-config";
import PageHero from "@/components/PageHero";
import CtaBanner from "@/components/CtaBanner";
import Calculator from "@/components/Calculator";
import {
  IconArrow,
  IconBuild,
  IconCanopy,
  IconDrop,
  IconRoof,
  IconSheet,
  IconTile,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Цени на ремонт на покриви",
  description:
    "Ориентировъчни фактори при ценообразуване на ремонт на покрив. Точна цена получавате безплатно, след оглед на място — без ангажимент.",
  alternates: { canonical: "/tseni" },
};

const iconMap = {
  roof: IconRoof,
  tile: IconTile,
  build: IconBuild,
  drop: IconDrop,
  sheet: IconSheet,
  canopy: IconCanopy,
};

const factors = [
  {
    title: "Квадратура на покрива",
    text: "Общата площ и наклонът на покрива определят количеството материали и труд.",
  },
  {
    title: "Вид на дейността",
    text: "Частичен ремонт, пренареждане или изграждане от нулата имат различен обхват.",
  },
  {
    title: "Избрани материали",
    text: "Видът керемиди, мембрани и обшивки влияят пряко върху крайната цена.",
  },
  {
    title: "Достъп до обекта",
    text: "Наклон, височина и нужда от скеле или кран се калкулират в офертата.",
  },
];

export default function TseniPage() {
  return (
    <>
      <PageHero
        eyebrow="Прозрачно ценообразуване"
        title="Цени"
        subtitle="Всеки покрив е различен, затова не предлагаме фиксирани цени „на калпак“. Вместо това — безплатен оглед и точна писмена оферта, съобразена с реалното състояние на Вашия покрив."
        crumb="Цени"
      />

      <section className="bg-charcoal py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <span className="section-eyebrow">Калкулатор</span>
          <h2 className="mt-3 font-display font-bold text-3xl text-cream">Изчисли ориентировъчна цена сега</h2>
          <p className="mt-3 max-w-2xl text-cream-dim leading-relaxed">
            Отговори на няколко въпроса и получи моментална приблизителна оценка — за минута, без чакане.
          </p>
          <div className="mt-8">
            <Calculator />
          </div>
        </div>
      </section>

      <section className="bg-charcoal-soft border-y border-line py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <h2 className="font-display font-bold text-2xl text-cream">Как се определя цената</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {factors.map((f) => (
              <div key={f.title} className="rounded-2xl border border-line bg-charcoal-card p-6">
                <h3 className="font-display font-semibold text-cream">{f.title}</h3>
                <p className="mt-2 text-sm text-cream-dim leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-line bg-charcoal-soft p-6 text-sm text-cream-dim leading-relaxed">
            Без авансово плащане — заплащате едва след одобрение на офертата и приемане на завършения обект.
          </div>
        </div>
      </section>

      <section className="bg-charcoal py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <h2 className="font-display font-bold text-2xl text-cream">Ценови предложения по дейности</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => {
              const Icon = iconMap[s.icon];
              return (
                <div
                  key={s.id}
                  className="flex flex-col justify-between rounded-2xl border border-line bg-charcoal p-6 card-glow"
                >
                  <div>
                    <Icon className="w-9 h-9 text-amber" />
                    <h3 className="mt-5 font-display font-semibold text-cream">{s.title}</h3>
                    <p className="mt-2 text-sm text-cream-dim leading-relaxed">{s.short}</p>
                  </div>
                  <Link
                    href="/bezplaten-ogled"
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-amber"
                  >
                    Виж нашите предложения
                    <IconArrow className="w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-charcoal-soft border-t border-line py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <CtaBanner />
          <p className="mt-6 text-center text-sm text-cream-dim">
            Или се обадете директно на{" "}
            <a href={`tel:${site.phones[0].href}`} className="text-amber font-semibold">
              {site.phones[0].display}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
