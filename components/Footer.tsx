import Link from "next/link";
import Reveal from "./Reveal";
import styles from "./Footer.module.css";
import { content } from "./siteContent";

// Normalises an editable social value into a usable href.
function normalize(kind: "instagram" | "whatsapp" | "phone", value: string) {
  const v = value.trim();
  if (!v) return "";
  if (kind === "phone") return `tel:${v.replace(/\s+/g, "")}`;
  if (/^https?:\/\//.test(v)) return v;
  if (kind === "whatsapp") return `https://wa.me/${v.replace(/[^\d]/g, "")}`;
  // instagram handle without url
  return `https://instagram.com/${v.replace(/^@/, "")}`;
}

const ICONS = {
  instagram: (
    <path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.06 1.8.25 2.2.42.6.22 1 .48 1.4.9.42.4.68.8.9 1.4.17.4.36 1 .42 2.2.07 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.06 1.2-.25 1.8-.42 2.2-.22.6-.48 1-.9 1.4-.4.42-.8.68-1.4.9-.4.17-1 .36-2.2.42-1.3.07-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.06-1.8-.25-2.2-.42-.6-.22-1-.48-1.4-.9-.42-.4-.68-.8-.9-1.4-.17-.4-.36-1-.42-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.06-1.2.25-1.8.42-2.2.22-.6.48-1 .9-1.4.4-.42.8-.68 1.4-.9.4-.17 1-.36 2.2-.42C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.1 0-3.5 0-4.7.07-1.1.05-1.7.24-2.1.4-.5.2-.9.44-1.3.84-.4.4-.64.8-.84 1.3-.16.4-.35 1-.4 2.1C2.6 8.5 2.6 8.9 2.6 12s0 3.5.07 4.7c.05 1.1.24 1.7.4 2.1.2.5.44.9.84 1.3.4.4.8.64 1.3.84.4.16 1 .35 2.1.4 1.2.07 1.6.07 4.7.07s3.5 0 4.7-.07c1.1-.05 1.7-.24 2.1-.4.5-.2.9-.44 1.3-.84.4-.4.64-.8.84-1.3.16-.4.35-1 .4-2.1.07-1.2.07-1.6.07-4.7s0-3.5-.07-4.7c-.05-1.1-.24-1.7-.4-2.1-.2-.5-.44-.9-.84-1.3-.4-.4-.8-.64-1.3-.84-.4-.16-1-.35-2.1-.4C15.5 4 15.1 4 12 4Zm0 3.1a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8Zm0 8.1a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Zm6.2-8.3a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0Z" />
  ),
  whatsapp: (
    <path d="M12 2a10 10 0 0 0-8.5 15.3L2 22l4.8-1.5A10 10 0 1 0 12 2Zm0 1.8a8.2 8.2 0 0 1 6.9 12.6l-.2.3.6 2.2-2.3-.6-.3.2A8.2 8.2 0 1 1 12 3.8Zm-3.1 3.6c-.15 0-.4.06-.6.3-.2.24-.78.76-.78 1.86s.8 2.16.9 2.3c.12.15 1.57 2.5 3.87 3.4 1.9.75 2.3.6 2.7.56.4-.04 1.3-.53 1.5-1.05.18-.52.18-.96.13-1.05-.05-.1-.2-.15-.42-.26-.22-.11-1.3-.64-1.5-.72-.2-.07-.35-.1-.5.11-.15.22-.57.72-.7.87-.13.15-.26.16-.48.05-.22-.11-.93-.34-1.77-1.1-.65-.58-1.1-1.3-1.22-1.52-.13-.22-.01-.34.1-.45.1-.1.22-.26.33-.39.11-.13.15-.22.22-.37.07-.15.04-.28-.02-.39-.05-.11-.48-1.2-.68-1.64-.16-.38-.33-.38-.48-.39h-.4Z" />
  ),
  phone: (
    <path d="M6.6 2.9c.3 0 .6.2.7.5l1.4 3.2c.1.3.06.6-.13.85l-1.3 1.6c.9 1.9 2.4 3.4 4.3 4.3l1.6-1.3c.25-.2.55-.24.85-.13l3.2 1.4c.3.13.5.42.5.72v3.3c0 .55-.45 1-1 1C10.3 22 2 13.7 2 3.9c0-.55.45-1 1-1h3.6Z" />
  ),
};

export default function Footer() {
  const c = content.footer;
  const social = c.social ?? { instagram: "", whatsapp: "", phone: "" };
  const socialLinks = (
    ["instagram", "whatsapp", "phone"] as const
  )
    .map((kind) => ({ kind, href: normalize(kind, social[kind] || "") }))
    .filter((s) => s.href);

  return (
    <footer id="contact" className={styles.footer} dir="ltr">
      <div className={styles.inner}>
        <div className={`${styles.grid} footgrid`}>
          <Reveal>
            <div className={styles.brand}>
              <span className={styles.brandSweets}>CHOCOLATE</span>
              <span className={styles.brandPiano}>PIANO</span>
            </div>
            <p className={styles.blurb}>{c.blurb}</p>
          </Reveal>
          <Reveal className={styles.col}>
            <span className={styles.colTitle}>{c.visitTitle}</span>
            <span className={styles.colText}>{c.visitAr}</span>
            <span className={`${styles.colText} ${styles.colTextLtr}`}>
              {c.visitEn}
            </span>
          </Reveal>
          <Reveal className={styles.col}>
            <span className={styles.colTitle}>{c.connectTitle}</span>
            <div className={styles.socialRow}>
              {socialLinks.map((s) => (
                <a
                  key={s.kind}
                  href={s.href}
                  className={styles.socialIcon}
                  aria-label={s.kind}
                  {...(s.kind === "phone"
                    ? {}
                    : { target: "_blank", rel: "noreferrer" })}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    {ICONS[s.kind]}
                  </svg>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
        <div className={styles.bottom}>
          <span className={styles.copyright}>{c.copyright}</span>
          <div className={styles.bottomRight}>
            <Link href="/admin" className={styles.adminLink}>
              لوحة الإدارة
            </Link>
            <span className={styles.tagline}>{c.tagline}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
