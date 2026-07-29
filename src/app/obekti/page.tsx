import Link from "next/link";
import type { Metadata } from "next";
import { services, site } from "@/lib/site-config";
import PageHero from "@/components/PageHero";
import ProjectTile from "@/components/ProjectTile";
import { IconArrow, IconPhone } from "@/components/icons";

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

      <section className="bg-charcoal-soft border-t border-line py-14">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <p className="font-display font-semibold text-lg text-cream">
            Искате обект като тези? Заявете безплатен оглед.
          </p>
          <div className="flex gap-3">
            <Link href="/bezplaten-ogled" className="btn-primary text-sm !py-2.5 !px-5">
              Заяви оглед
              <IconArrow className="w-4 h-4" />
            </Link>
            <a href={`tel:${site.phones[0].href}`} className="btn-outline text-sm !py-2.5 !px-5">
              <IconPhone className="w-4 h-4" />
              {site.phones[0].display}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
