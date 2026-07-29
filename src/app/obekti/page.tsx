import type { Metadata } from "next";
import { services } from "@/lib/site-config";
import PageHero from "@/components/PageHero";
import ProjectTile from "@/components/ProjectTile";
import ReviewsSection from "@/components/ReviewsSection";
import CtaBanner from "@/components/CtaBanner";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Завършени обекти",
  description:
    "Разгледайте видовете покривни проекти, които изпълняваме — от пренареждане на керемиди до цялостно изграждане на нови покриви, навсякъде в България.",
  alternates: { canonical: "/obekti" },
};

const gallery = [...services, ...services.slice(0, 3)];

export default function ObektiPage() {
  return (
    <>
      <PageHero
        eyebrow="Нашата работа"
        title="Завършени обекти"
        subtitle="Всеки завършен покрив е доказателство за нашия професионализъм и внимание към детайла. Изпълняваме проекти от всякакъв мащаб, навсякъде в България."
        crumb="Обекти"
      />

      <section className="bg-charcoal py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="grid gap-5 grid-cols-2 lg:grid-cols-3">
            {gallery.map((s, i) => (
              <ProjectTile key={`${s.id}-${i}`} service={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-charcoal-soft border-y border-line py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <SectionHeading eyebrow="Наши клиенти" title="Оставяме нашата работа да говори вместо нас" align="center" />
          <div className="mt-12">
            <ReviewsSection />
          </div>
        </div>
      </section>

      <section className="bg-charcoal py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <CtaBanner />
        </div>
      </section>
    </>
  );
}
