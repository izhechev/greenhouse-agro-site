import type { Metadata } from "next";
import { site } from "@/lib/site-config";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import { IconPhone, IconViber } from "@/components/icons";

export const metadata: Metadata = {
  title: "Контакт",
  description:
    "Свържете се с нас за ремонт на покрив — телефон, имейл или форма за запитване. Отговаряме до един работен ден.",
  alternates: { canonical: "/kontakt" },
};

export default function KontaktPage() {
  return (
    <>
      <PageHero
        eyebrow="Свържете се с нас"
        title="Контакт"
        subtitle="При всякакви въпроси и колебания — преди, по време на, и след започнат процес на работа."
        crumb="Контакт"
      />

      <section className="bg-charcoal py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-10 grid lg:grid-cols-[0.8fr_1.2fr] gap-12">
          <div className="flex flex-col gap-6">
            <div className="rounded-2xl border border-line bg-charcoal-card p-6">
              <span className="section-eyebrow">Имейл адрес</span>
              <a href={`mailto:${site.email}`} className="mt-2 block font-display font-semibold text-cream hover:text-amber transition-colors">
                {site.email}
              </a>
            </div>
            <div className="rounded-2xl border border-line bg-charcoal-card p-6">
              <span className="section-eyebrow">Телефон</span>
              <div className="mt-2 flex flex-col gap-2">
                {site.phones.map((p) => (
                  <a
                    key={p.href}
                    href={`tel:${p.href}`}
                    className="flex items-center gap-2 font-display font-semibold text-cream hover:text-amber transition-colors"
                  >
                    <IconPhone className="w-4 h-4" /> {p.display}
                  </a>
                ))}
                <a
                  href={site.viberHref}
                  className="flex items-center gap-2 font-display font-semibold text-cream hover:text-amber transition-colors"
                >
                  <IconViber className="w-4 h-4" /> Viber
                </a>
              </div>
            </div>
            <div className="rounded-2xl border border-line bg-charcoal-card p-6">
              <span className="section-eyebrow">Покритие</span>
              <p className="mt-2 text-sm text-cream-dim leading-relaxed">{site.coverage}</p>
            </div>
          </div>

          <div>
            <h2 className="font-display font-bold text-2xl text-cream mb-6">Попълнете нашата форма</h2>
            <ContactForm formName="Контакт" />
          </div>
        </div>
      </section>
    </>
  );
}
