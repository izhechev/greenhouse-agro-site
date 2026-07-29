import type { FaqItem } from "@/lib/site-config";

export default function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-line border-t border-b border-line">
      {items.map((item) => (
        <details key={item.q} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display font-semibold text-cream">
            {item.q}
            <span className="shrink-0 text-amber text-xl leading-none transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="mt-3 text-sm text-cream-dim leading-relaxed">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
