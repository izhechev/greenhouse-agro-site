import type { Service } from "@/lib/site-config";
import {
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

const gradients = [
  "from-brick-deep via-brick to-ember",
  "from-charcoal-card via-brick-deep to-brick",
  "from-ember via-brick to-brick-deep",
  "from-charcoal-soft via-charcoal-card to-brick-deep",
];

export default function ProjectTile({ service, index }: { service: Service; index: number }) {
  const Icon = iconMap[service.icon];
  return (
    <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-line">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]} opacity-90 transition-transform duration-500 group-hover:scale-105`}
      />
      <div className="absolute inset-0 bg-grain" />
      <div className="absolute inset-0 flex items-center justify-center">
        <Icon className="w-16 h-16 text-cream/25" />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-charcoal/90 to-transparent">
        <p className="font-display font-semibold text-cream text-sm">{service.title}</p>
      </div>
    </div>
  );
}
