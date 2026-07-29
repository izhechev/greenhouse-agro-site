type IconProps = { className?: string };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconRoof({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} {...base}>
      <path d="M4 22 20 8l16 14" />
      <path d="M8 22v10h24V22" />
      <path d="M16 32v-8h8v8" />
    </svg>
  );
}

export function IconTile({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} {...base}>
      <path d="M4 30c2-6 2-12 0-18" />
      <path d="M12 30c2-6 2-12 0-18" />
      <path d="M20 30c2-6 2-12 0-18" />
      <path d="M28 30c2-6 2-12 0-18" />
      <path d="M36 30c2-6 2-12 0-18" />
    </svg>
  );
}

export function IconBuild({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} {...base}>
      <path d="M6 34V16l14-9 14 9v18" />
      <path d="M6 34h28" />
      <path d="M14 34V22h12v12" />
      <path d="M6 20l14-8 14 8" />
    </svg>
  );
}

export function IconDrop({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} {...base}>
      <path d="M20 5c7 9 11 15.5 11 20.5A11 11 0 1 1 9 25.5C9 20.5 13 14 20 5Z" />
      <path d="M14 26a6 6 0 0 0 6 6" />
    </svg>
  );
}

export function IconSheet({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} {...base}>
      <path d="M6 12h20l8 8v12H6z" />
      <path d="M26 12v8h8" />
      <path d="M12 26h14" />
      <path d="M12 31h10" />
    </svg>
  );
}

export function IconCanopy({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} {...base}>
      <path d="M4 16 20 9l16 7" />
      <path d="M4 16h32l-3 5H7z" />
      <path d="M12 21v11" />
      <path d="M28 21v11" />
    </svg>
  );
}

export function IconPhone({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v3a2 2 0 0 1-2 2C10.6 20 4 13.4 4 6a2 2 0 0 1 1-2Z" />
    </svg>
  );
}

export function IconViber({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12.1 2C7 2 3.2 5.4 3.2 10c0 2.6 1.2 4.9 3.2 6.4-.1 1-.4 2.4-1 3.4a.4.4 0 0 0 .5.6c1.4-.5 2.9-1.3 3.7-1.8.8.2 1.6.3 2.5.3 5.1 0 8.9-3.4 8.9-8s-3.8-8.9-8.9-8.9Zm4.9 11.5c-.2.5-1.1 1-1.6 1-.4 0-.8 0-2.6-1.1-1.6-1-2.7-2.7-2.8-2.9-.1-.1-.7-.9-.7-1.8s.5-1.3.7-1.5c.2-.2.4-.3.6-.3h.4c.2 0 .3 0 .5.4.2.5.7 1.6.7 1.7.1.1.1.3 0 .4-.1.2-.1.3-.3.4-.1.2-.3.3-.4.5-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1.2-.2.6-.7.8-1 .2-.2.4-.2.6-.1l1.5.8c.2.1.3.2.3.3.1.2.1.7-.1 1.1Z" />
      <path d="M12 4.5c-3.9 0-6.9 2.6-6.9 5.9 0 1.8.9 3.4 2.3 4.5" />
    </svg>
  );
}

export function IconStar({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="currentColor">
      <path d="M10 1.5l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L1.3 7.8l6.1-.7z" />
    </svg>
  );
}

export function IconCheck({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function IconArrow({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function IconDrone({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} {...base}>
      <circle cx="20" cy="20" r="5" />
      <path d="M8 8l7 7M32 8l-7 7M8 32l7-7M32 32l-7-7" />
      <circle cx="8" cy="8" r="3" />
      <circle cx="32" cy="8" r="3" />
      <circle cx="8" cy="32" r="3" />
      <circle cx="32" cy="32" r="3" />
    </svg>
  );
}

export function IconShield({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} {...base}>
      <path d="M20 5 33 10v9c0 9-5.5 14.5-13 16-7.5-1.5-13-7-13-16v-9Z" />
      <path d="M14 20l4 4 8-8" />
    </svg>
  );
}

export function IconMoney({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} {...base}>
      <rect x="5" y="12" width="30" height="18" rx="2" />
      <circle cx="20" cy="21" r="5" />
      <path d="M9 12v-3h22v3" />
    </svg>
  );
}
