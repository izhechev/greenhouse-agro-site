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

## Deploy

Проектът е готов за деплой във Vercel (`vercel.com/new`, импортирай това repo).
