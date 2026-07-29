import type { Metadata } from "next";
import { site } from "@/lib/site-config";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Политика на поверителност",
  description: "Политика на поверителност и обработка на лични данни на " + site.legalName + ".",
  alternates: { canonical: "/politika-za-poveritelnost" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Правна информация"
        title="Политика на поверителност"
        crumb="Политика на поверителност"
      />
      <section className="bg-charcoal py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 prose-invert space-y-8 text-sm text-cream-dim leading-relaxed">
          <div>
            <h2 className="font-display font-semibold text-lg text-cream mb-2">
              1. Администратор на лични данни
            </h2>
            <p>
              {site.legalName} („ние“, „нас“) е администратор на личните данни, които
              предоставяте чрез настоящия уебсайт. За въпроси, свързани с обработката
              на лични данни, можете да се свържете с нас на {site.email} или на
              телефоните, посочени в раздел „Контакт“.
            </p>
          </div>

          <div>
            <h2 className="font-display font-semibold text-lg text-cream mb-2">
              2. Какви данни събираме
            </h2>
            <p>
              Чрез формите за запитване и безплатен оглед събираме: име, имейл адрес,
              телефонен номер, населено място, приблизителна квадратура и структура на
              покрива, както и съдържанието на запитването Ви. Тези данни се
              предоставят доброволно от Вас.
            </p>
          </div>

          <div>
            <h2 className="font-display font-semibold text-lg text-cream mb-2">
              3. Цели на обработката
            </h2>
            <p>
              Използваме предоставените данни единствено за да се свържем с Вас,
              да организираме безплатен оглед и да изготвим ценова оферта за
              заявената услуга. Не продаваме и не предоставяме личните Ви данни на
              трети страни за маркетингови цели.
            </p>
          </div>

          <div>
            <h2 className="font-display font-semibold text-lg text-cream mb-2">
              4. Бисквитки и рекламни партньори
            </h2>
            <p>
              Сайтът може да използва „бисквитки“ и пиксела на Meta (Facebook), за да
              измерва ефективността на рекламните кампании и да подобрява съдържанието
              си. Можете да управлявате или изключите бисквитките през настройките на
              своя браузър по всяко време.
            </p>
          </div>

          <div>
            <h2 className="font-display font-semibold text-lg text-cream mb-2">
              5. Срок на съхранение
            </h2>
            <p>
              Съхраняваме личните Ви данни само за периода, необходим за обработка на
              запитването и изпълнение на евентуален договор, освен ако приложимото
              законодателство изисква по-дълъг срок.
            </p>
          </div>

          <div>
            <h2 className="font-display font-semibold text-lg text-cream mb-2">
              6. Вашите права
            </h2>
            <p>
              Съгласно Общия регламент за защита на данните (ОРЗД/GDPR) имате право на
              достъп, коригиране, изтриване и ограничаване на обработката на личните
              Ви данни, както и право на възражение и право на жалба до Комисията за
              защита на личните данни (КЗЛД).
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
