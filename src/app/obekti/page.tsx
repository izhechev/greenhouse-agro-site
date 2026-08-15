import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { site } from "@/lib/site-config";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { IconArrow, IconPhone } from "@/components/icons";

export const metadata: Metadata = {
  title: "Завършени обекти",
  description:
    "Разгледайте снимки от завършени покривни проекти — цялостен ремонт на покрив в с. Марково и други изпълнени обекти в цяла България.",
  alternates: { canonical: "/obekti" },
};

type Project = {
  eyebrow: string;
  title: string;
  subtitle: string;
  prefix: string;
  count: number;
  alt: string;
};

const projects: Project[] = [
  {
    eyebrow: "Завършен обект",
    title: "Цялостен ремонт на покрив – с. Марково",
    subtitle:
      "Завършен цялостен ремонт на покрив в с. Марково — нова хидроизолация, пренаредени керемиди и довършителни тенекеджийски работи.",
    prefix: "markovo",
    count: 9,
    alt: "Цялостен ремонт на покрив в с. Марково",
  },
  {
    eyebrow: "Нашата работа",
    title: "Ремонт на покрив",
    subtitle:
      "Снимки от процеса на работа по покрива — конструкция, изолация и покривно покритие, изпълнени от нашия екип.",
    prefix: "pokriv",
    count: 13,
    alt: "Ремонт на покрив от екипа на Грийнхаус Агро",
  },
];

function ProjectGallery({ project }: { project: Project }) {
  const images = Array.from({ length: project.count }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    return `/images/obekti/${project.prefix}-${n}.webp`;
  });

  return (
    <div>
      <SectionHeading eyebrow={project.eyebrow} title={project.title} subtitle={project.subtitle} />
      <div className="mt-8 grid gap-5 grid-cols-2 lg:grid-cols-3">
        {images.map((src, i) => (
          <div
            key={src}
            className="group relative aspect-video overflow-hidden rounded-2xl border border-line"
          >
            <Image
              src={src}
              alt={`${project.alt} – снимка ${i + 1}`}
              fill
              sizes="(min-width: 1024px) 33vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

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
        <div className="max-w-6xl mx-auto px-6 lg:px-10 space-y-16 sm:space-y-20">
          {projects.map((project) => (
            <ProjectGallery key={project.prefix} project={project} />
          ))}
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
