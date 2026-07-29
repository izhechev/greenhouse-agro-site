import Link from "next/link";
import type { Service } from "@/lib/site-config";
import {
  IconArrow,
  IconBuild,
  IconCanopy,
  IconDrop,
  IconRoof,
  IconSheet,
  IconTile,
} from "@/components/icons";

const iconMap = {
  roof: IconRoof,
  tile: IconTile,
  build: IconBuild,
  drop: IconDrop,
  sheet: IconSheet,
  canopy: IconCanopy,
};

export default function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = iconMap[service.icon];
  return (
    <Link
      href={`/uslugi#${service.slug}`}
      className="group relative flex flex-col justify-between rounded-2xl border border-line bg-charcoal-card p-7 card-glow transition-colors hover:border-ember/60"
    >
      <div>
        <div className="flex items-start justify-between">
          <span className="font-display text-xs text-cream-dim/60">{String(index + 1).padStart(2, "0")}</span>
          <Icon className="w-9 h-9 text-amber" />
        </div>
        <h3 className="font-display font-semibold text-lg text-cream mt-5">{service.title}</h3>
        <p className="mt-3 text-sm text-cream-dim leading-relaxed">{service.short}</p>
      </div>
      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-amber">
        Научи повече
        <IconArrow className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
