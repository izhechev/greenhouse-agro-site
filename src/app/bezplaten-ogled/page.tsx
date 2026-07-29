import type { Metadata } from "next";
import { site } from "@/lib/site-config";
import ContactForm from "@/components/ContactForm";
import ReviewsSection from "@/components/ReviewsSection";
import ProcessSteps from "@/components/ProcessSteps";
import StatsBar from "@/components/StatsBar";
import SectionHeading from "@/components/SectionHeading";
import CtaBanner from "@/components/CtaBanner";
import {
  IconBuild,
  IconDrone,
  IconDrop,
  IconMoney,
  IconPhone,
  IconRoof,
  IconSheet,
  IconShield,
  IconTile,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Безплатен оглед и оферта",
  description:
    "Заявете безплатен оглед за ремонт на покрив — оглед с дрон, точна оферта без скрити такси и без авансово плащане. Гаранция до 10 години.",
  alternates: { canonical: "/bezplaten-ogled" },
};

const included = [
  { icon: IconDrone, title: "Заснемане с дрон" },
  { icon: IconShield, title: "Проверка от специалист" },
  { icon: IconRoof, title: "Оценка на конструкцията" },
  { icon: IconDrop, title: "Проверка за течове" },
  { icon: IconTile, title: "Проверка на керемиди" },
  { icon: IconSheet, title: "Проверка на обшивки" },
  { icon: IconBuild, title: "Проверка на комини" },
  { icon: IconMoney, title: "Подробна оферта" },
];

export default function BezplatenOgledPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-grain border-b border-line">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -right-40 w-[36rem] h-[36rem] rounded-full bg-brick/25 blur-3xl"
        />
        <div className="relative max-w-6xl mx-auto px-6 lg:px-10 pt-16 pb-20 sm:pt-20 sm:pb-24">
          <div className="grid lg:grid-cols-[1fr_0.9fr] gap-14 items-start">
            <div className="animate-rise">
              <span className="section-eyebrow">Покривът Ви тече?</span>
              <h1 className="mt-3 font-display font-bold text-4xl sm:text-5xl leading-[1.05] text-cream">
                Безплатен оглед за <span className="text-gradient">ремонт на покрив</span>
              </h1>
              <p className="mt-6 text-cream-dim leading-relaxed max-w-lg">
                Всеки оглед включва заснемане с дрон и подробна проверка от
                опитен специалист на място. Без авансово плащане — всичко се
                заплаща след завършване на проекта.
              </p>
              <ul className="mt-7 grid grid-cols-2 gap-3 max-w-md text-sm text-cream-dim">
                <li>Оглед с дрон на място</li>
                <li>Без авансово плащане</li>
                <li>Оферта без скрити такси</li>
                <li>Гаранция до 10 години</li>
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                {site.phones.map((p) => (
                  <a key={p.href} href={`tel:${p.href}`} className="btn-outline text-sm !py-2.5 !px-5">
                    <IconPhone className="w-4 h-4" />
                    {p.display}
                  </a>
                ))}
              </div>
              <div className="mt-10 hidden lg:block">
                <StatsBar />
              </div>
            </div>

            <div id="forma" className="animate-rise [animation-delay:150ms] scroll-mt-24">
              <ContactForm formName="Безплатен оглед" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-charcoal py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <SectionHeading
            eyebrow="Нашето предложение"
            title="Какво включва безплатният оглед"
            subtitle="Получавате безплатен оглед, точна оценка и подробна ценова оферта без никакъв ангажимент. Заплащането се извършва след приключване на работата."
          />
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-5">
            {included.map((item) => (
              <div key={item.title} className="rounded-2xl border border-line bg-charcoal-card p-5 text-center">
                <item.icon className="w-8 h-8 text-amber mx-auto" />
                <p className="mt-4 text-sm font-medium text-cream leading-snug">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-charcoal-soft border-y border-line py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <SectionHeading eyebrow="Как протича" title="Безплатният оглед стъпка по стъпка" />
          <div className="mt-14">
            <ProcessSteps />
          </div>
        </div>
      </section>

      <section className="bg-charcoal py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <SectionHeading eyebrow="Доверие и сигурност" title="Защо хората се доверяват на нас" align="center" />
          <div className="mt-12">
            <ReviewsSection />
          </div>
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
