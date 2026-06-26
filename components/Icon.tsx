import type { SVGProps } from "react";

/**
 * Single consistent icon family. Stroke 1.5, round caps (skill §4 icon-style-consistent).
 * Decorative by default (aria-hidden); pass `title` for meaningful icons.
 */
type IconName =
  | "note"
  | "harmony"
  | "sparkle"
  | "crown"
  | "gift"
  | "building"
  | "user"
  | "heart"
  | "leaf"
  | "arrowDown"
  | "arrowLeft"
  | "instagram"
  | "whatsapp"
  | "pin"
  | "check"
  | "spinner";

const paths: Record<IconName, React.ReactNode> = {
  note: (
    <>
      <path d="M9 18V5l10-2v12" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="16" cy="15" r="3" />
    </>
  ),
  harmony: (
    <>
      <path d="M3 12c2-5 4-5 6 0s4 5 6 0 4-5 6 0" />
    </>
  ),
  sparkle: (
    <>
      <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
      <path d="M19 16l.7 2 2 .7-2 .7L19 22l-.7-2-2-.7 2-.7z" />
    </>
  ),
  crown: (
    <>
      <path d="M3 8l4 4 5-7 5 7 4-4-2 11H5z" />
    </>
  ),
  gift: (
    <>
      <rect x="4" y="9" width="16" height="11" rx="1" />
      <path d="M4 13h16M12 9v11M12 9c-2-4-6-4-6-1 0 1.5 2 1 6 1zM12 9c2-4 6-4 6-1 0 1.5-2 1-6 1z" />
    </>
  ),
  building: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="1" />
      <path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M10 21v-3h4v3" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M5 21c0-4 3.5-6 7-6s7 2 7 6" />
    </>
  ),
  heart: (
    <>
      <path d="M12 20s-7-4.5-7-10a4 4 0 017-2.5A4 4 0 0119 10c0 5.5-7 10-7 10z" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 19c0-8 6-13 14-14 0 8-5 14-14 14z" />
      <path d="M5 19c3-4 6-6 10-7" />
    </>
  ),
  arrowDown: (
    <>
      <path d="M12 5v14M6 13l6 6 6-6" />
    </>
  ),
  arrowLeft: (
    <>
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M4 20l1.4-4A8 8 0 1112 20a8 8 0 01-3.5-.8L4 20z" />
      <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5.6 0 1-.5 1-.5l-1.5-1-1 .6c-1.2-.4-2.2-1.4-2.6-2.6l.6-1-1-1.5s-.5.4-.5 1z" fill="currentColor" stroke="none" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6 7-11a7 7 0 10-14 0c0 5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  check: (
    <>
      <path d="M5 12.5l4.5 4.5L19 7" />
    </>
  ),
  spinner: (
    <>
      <path d="M12 3a9 9 0 109 9" />
    </>
  ),
};

export default function Icon({
  name,
  size = 24,
  title,
  ...rest
}: { name: IconName; size?: number; title?: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {paths[name]}
    </svg>
  );
}
