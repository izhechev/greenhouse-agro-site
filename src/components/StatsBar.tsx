"use client";

import { useEffect, useRef, useState } from "react";
import { stats } from "@/lib/site-config";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let started = false;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          started = true;
          const duration = 1200;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.round(eased * value));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="font-display text-3xl sm:text-4xl font-bold text-cream">
      {display}
      <span className="text-gradient">{suffix}</span>
    </span>
  );
}

export default function StatsBar() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {stats.map((s) => (
        <div key={s.label} className="rounded-2xl border border-line bg-charcoal/40 px-4 py-5 text-center">
          <Counter value={s.value} suffix={s.suffix} />
          <p className="mt-2 text-xs sm:text-sm text-cream-dim leading-snug">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
