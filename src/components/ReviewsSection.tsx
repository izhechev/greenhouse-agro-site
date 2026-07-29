import { reviews } from "@/lib/site-config";
import { IconStar } from "@/components/icons";

export default function ReviewsSection() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {reviews.map((r) => (
        <figure
          key={r.name}
          className="flex flex-col rounded-2xl border border-line bg-charcoal-card p-6"
        >
          <div className="flex items-center gap-0.5 text-amber">
            {Array.from({ length: r.rating }).map((_, i) => (
              <IconStar key={i} className="w-4 h-4" />
            ))}
          </div>
          <blockquote className="mt-4 text-sm text-cream-dim leading-relaxed flex-1">
            &ldquo;{r.text}&rdquo;
          </blockquote>
          <figcaption className="mt-5 flex items-center justify-between border-t border-line pt-4">
            <span className="text-sm font-semibold text-cream">{r.name}</span>
            <span className="text-xs text-cream-dim/70">{r.timeAgo}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
