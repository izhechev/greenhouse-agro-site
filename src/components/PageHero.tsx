import Link from "next/link";

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  crumb,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  crumb: string;
}) {
  return (
    <section className="relative overflow-hidden bg-grain border-b border-line">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 w-96 h-96 rounded-full bg-brick/20 blur-3xl"
      />
      <div className="relative max-w-6xl mx-auto px-6 lg:px-10 pt-14 pb-16 sm:pt-20 sm:pb-20">
        <p className="text-xs text-cream-dim/70">
          <Link href="/" className="hover:text-amber transition-colors">
            Начало
          </Link>
          <span className="mx-2">»</span>
          {crumb}
        </p>
        <span className="section-eyebrow mt-6 inline-block">{eyebrow}</span>
        <h1 className="mt-3 font-display font-bold text-4xl sm:text-5xl text-cream leading-tight max-w-2xl">
          {title}
        </h1>
        {subtitle && <p className="mt-5 text-cream-dim leading-relaxed max-w-xl">{subtitle}</p>}
      </div>
    </section>
  );
}
