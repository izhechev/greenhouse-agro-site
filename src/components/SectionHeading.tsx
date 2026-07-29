export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center max-w-2xl mx-auto" : "max-w-2xl"}>
      <span className="section-eyebrow">{eyebrow}</span>
      <h2 className="mt-3 font-display font-bold text-3xl sm:text-4xl text-cream leading-tight">{title}</h2>
      {subtitle && <p className="mt-4 text-cream-dim leading-relaxed">{subtitle}</p>}
    </div>
  );
}
