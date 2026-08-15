# Грийнхаус Агро — сайт за ремонт на покриви

Маркетингов сайт на Next.js (App Router, TypeScript, Tailwind CSS v4) за фирма
за ремонт на покриви, работеща в цяла България.

## Разработка

```bash
npm install
npm run dev
```

Отвори [http://localhost:3000](http://localhost:3000).

## Структура

- `/` — начало
- `/uslugi` — услуги и дейности
- `/tseni` — цени
- `/obekti` — завършени обекти
- `/kontakt` — контакт
- `/bezplaten-ogled` — landing страница за реклами (Meta/Facebook Ads)
- `/politika-za-poveritelnost` — политика на поверителност

Съдържанието (услуги, отзиви, ЧЗВ, контакти) се редактира от едно място:
`src/lib/site-config.ts`.

## Environment променливи

Копирай `.env.example` в `.env.local` и попълни:

- `NEXT_PUBLIC_SITE_URL` — реалният домейн на сайта (за SEO metadata, sitemap, canonical URLs)
- `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` — за реално изпращане на имейли от контактната форма (виж [resend.com](https://resend.com))
- `NEXT_PUBLIC_META_PIXEL_ID` — Meta (Facebook) Pixel ID за проследяване на реклами

Без тези променливи сайтът работи нормално — формата логва запитването в конзолата, а пикселът просто не се зарежда.

## Снимки

Снимките на обектите се обработват предварително, защото на безплатния план на
Cloudflare няма оптимизация по време на заявка (`next/image` е с `unoptimized`).

Слагаш новите снимки в папка под `images/` (тя не влиза в git), добавяш папката в
`SOURCES` в `scripts/optimize-images.mjs` и пускаш:

```bash
npm run images
```

Скриптът смалява до 900px, конвертира към WebP и записва в `public/images/obekti/`.

## Deploy — Cloudflare Workers

Сайтът се хоства на Cloudflare Workers чрез адаптера
[`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare) (безплатен план).

Еднократно, първия път:

```bash
npx wrangler login
```

След това при всяка промяна:

```bash
npm run deploy
```

`npm run preview` пуска сайта локално в истинската Workers среда преди деплой.

Env променливите в production се задават като secrets, не във файл:

```bash
npx wrangler secret put RESEND_API_KEY
```

`NEXT_PUBLIC_*` променливите трябва да са налични по време на билда (те се
вграждат в HTML-а), затова се задават в `.env.local` локално или в
Build variables, ако се използва Workers Builds.
