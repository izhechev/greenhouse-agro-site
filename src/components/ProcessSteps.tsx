import { processSteps } from "@/lib/site-config";

export default function ProcessSteps() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {processSteps.map((s, i) => (
        <div key={s.step} className="relative pl-2">
          <span className="font-display text-5xl font-bold text-gradient">{s.step}</span>
          <h3 className="mt-4 font-display font-semibold text-cream">{s.title}</h3>
          <p className="mt-2 text-sm text-cream-dim leading-relaxed">{s.text}</p>
          {i < processSteps.length - 1 && (
            <span className="hidden lg:block absolute top-6 -right-4 w-8 h-px bg-line" />
          )}
        </div>
      ))}
    </div>
  );
}
