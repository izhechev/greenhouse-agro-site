import Link from "next/link";
import type { Metadata } from "next";
import { faq, services, site } from "@/lib/site-config";
import ServiceCard from "@/components/ServiceCard";
import StatsBar from "@/components/StatsBar";
import ProcessSteps from "@/components/ProcessSteps";
import ReviewsSection from "@/components/ReviewsSection";
import CtaBanner from "@/components/CtaBanner";
import SectionHeading from "@/components/SectionHeading";
import Faq from "@/components/Faq";
import {
  IconArrow,
  IconDrone,
  IconMoney,
  IconPhone,
  IconShield,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Ремонт на покриви в цяла България",
  description: site.description,
  alternates: { canonical: "/" },
};

const trustPoints = [
  {
    icon: IconShield,
    title: "Екип от професионалисти",
    text: "Обучени майстори с дългогодишен опит в покривни ремонти.",
  },
  {
    icon: IconDrone,
    title: "Оглед с дрон на място",
    text: "Точна диагностика на конструкцията преди изготвяне на офертата.",
  },
  {
    icon: IconMoney,
    title: "Без авансово плащане",
    text: "Заплащате едва след приемане на завършения обект.",
  },
  {
    icon: IconPhone,
    title: "Открита комуникация",
    text: "Знаете предварително какво, кога и колко ще струва.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-grain">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -right-40 w-[36rem] h-[36rem] rounded-full bg-brick/25 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-20 -left-32 w-96 h-96 rounded-full bg-amber/10 blur-3xl"
        />
        <div className="relative max-w-6xl mx-auto px-6 lg:px-10 pt-16 pb-20 sm:pt-24 sm:pb-28">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
            <div className="animate-rise">
              <span className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-1.5 text-xs font-medium text-cream-dim">
                {site.coverage}
              </span>
              <h1 className="mt-6 font-display font-bold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-cream">
                Покривът Ви <span className="text-gradient">тече?</span>
              </h1>
              <p className="mt-6 text-lg text-cream-dim leading-relaxed max-w-lg">
                {site.brand} извършва цялостни покривни ремонти – от частично
                пренареждане на керемиди до изграждане на нови покриви.
                Доказани материали, опитни майстори и гаранция за качество
                във всяка стъпка.
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <Link href="/bezplaten-ogled" className="btn-primary">
                  Получи безплатен оглед
                  <IconArrow className="w-4 h-4" />
                </Link>
                <a href={`tel:${site.phones[0].href}`} className="btn-outline">
                  <IconPhone className="w-4 h-4" />
                  {site.phones[0].display}
                </a>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-cream-dim">
                <span>Оглед с дрон на място</span>
                <span>Без авансово плащане</span>
                <span>Гаранция до 10 години</span>
              </div>
            </div>

            <div className="animate-rise [animation-delay:150ms] rounded-3xl border border-line bg-charcoal-card p-8 card-glow">
              <StatsBar />
              <div className="mt-8 border-t border-line pt-6">
                <p className="text-sm text-cream-dim leading-relaxed">
                  Работим само със собствен вътрешен екип от доказани
                  специалисти — не разчитаме на случайни бригади или
                  подизпълнители.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="roof-tiles-up" style={{ ["--tile-color" as string]: "var(--charcoal)" }} />
      </section>

      {/* Services */}
      <section className="bg-charcoal py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <SectionHeading
            eyebrow="Какво предлагаме"
            title="Покривни услуги"
            subtitle="С времето всяка покривна конструкция се износва — керемиди се пропукват, мушамата се разпада, появяват се течове и мухъл. Редовната поддръжка и ремонт е ключова за дълготрайността на дома Ви."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <ServiceCard key={s.id} service={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Coverage + year-round */}
      <section className="bg-charcoal-soft border-y border-line py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 grid gap-10 lg:grid-cols-2">
          <div className="rounded-2xl border border-line bg-charcoal p-8">
            <span className="section-eyebrow">Национално покритие</span>
            <h3 className="mt-3 font-display font-semibold text-xl text-cream">
              Ремонт на покриви в цялата страна
            </h3>
            <p className="mt-3 text-sm text-cream-dim leading-relaxed">
              Извършваме ремонти на покриви навсякъде в България — независимо
              дали сте в град, село или вилна зона. Нашият екип достига до
              Вас, за да предложи бързо и качествено обслужване без значение
              от локацията.
            </p>
          </div>
          <div className="rounded-2xl border border-line bg-charcoal p-8">
            <span className="section-eyebrow">Целогодишно</span>
            <h3 className="mt-3 font-display font-semibold text-xl text-cream">
              Ремонт на покриви през цялата година
            </h3>
            <p className="mt-3 text-sm text-cream-dim leading-relaxed">
              Работим целогодишно — дори през зимата. Използваме материали и
              техники, подходящи за всеки сезон, за да гарантираме здрав и
              надежден покрив независимо от времето навън.
            </p>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="bg-charcoal py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <SectionHeading
            eyebrow="Доверие и сигурност"
            title="Защо хората се доверяват на нас"
            subtitle="Доверието се печели с честна работа, а не с обещания. Всеки проект започва с подробен оглед, ясна оферта и предварително уточнен обхват на работата."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trustPoints.map((t) => (
              <div key={t.title} className="rounded-2xl border border-line bg-charcoal-card p-6">
                <t.icon className="w-9 h-9 text-amber" />
                <h3 className="mt-5 font-display font-semibold text-cream">{t.title}</h3>
                <p className="mt-2 text-sm text-cream-dim leading-relaxed">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-charcoal-soft border-y border-line py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <SectionHeading
            eyebrow="Как протича"
            title="Безплатният оглед стъпка по стъпка"
          />
          <div className="mt-14">
            <ProcessSteps />
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-charcoal py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <SectionHeading eyebrow="Наши клиенти" title="Какво казват хората за нас" />
          <div className="mt-12">
            <ReviewsSection />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-charcoal-soft border-y border-line py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <CtaBanner />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-charcoal py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <SectionHeading eyebrow="Вие питате — ние отговаряме" title="Често задавани въпроси" align="center" />
          <div className="mt-12">
            <Faq items={faq} />
          </div>
        </div>
      </section>
    </>
  );
}
