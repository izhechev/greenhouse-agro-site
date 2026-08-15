/**
 * Марката на фирмата — покрив и къща, в същите цветове като иконата
 * на таба (src/app/icon.svg), за да са едно и също лого навсякъде.
 */
export default function Logo({ className = "w-9 h-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden focusable="false">
      <defs>
        <linearGradient id="logo-roof" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--amber)" />
          <stop offset="0.55" stopColor="var(--ember)" />
          <stop offset="1" stopColor="var(--brick)" />
        </linearGradient>
      </defs>
      <path d="M16 4.4 30.8 16.8H1.2Z" fill="url(#logo-roof)" />
      <rect x="6.6" y="16.8" width="18.8" height="10.4" rx="1.4" fill="var(--cream)" />
      <rect x="13.5" y="20.4" width="5" height="6.8" rx="0.9" fill="var(--charcoal)" />
    </svg>
  );
}
