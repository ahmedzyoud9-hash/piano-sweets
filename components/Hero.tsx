import { Fragment } from "react";
import styles from "./Hero.module.css";
import { content } from "./siteContent";

// The CTA label can mix Arabic and Latin (e.g. "اطلب الآن  Order now").
// letter-spacing looks right on the uppercase Latin part but breaks the
// connected Arabic script, so we only apply the tracking to Latin runs.
function renderCta(text: string) {
  const parts = text.split(/([A-Za-z0-9][A-Za-z0-9\s]*[A-Za-z0-9]|[A-Za-z0-9])/);
  return parts
    .filter((part) => part !== "")
    .map((part, i) =>
      /[A-Za-z0-9]/.test(part) ? (
        <span key={i} className={styles.ctaEn}>
          {part}
        </span>
      ) : (
        <Fragment key={i}>{part}</Fragment>
      ),
    );
}

export default function Hero() {
  const c = content.hero;
  const img = c.logo?.web || "";
  const mark = (c as { mark?: { web?: string } }).mark?.web || "";
  const ctaLink = c.ctaLink || "#story";
  const external = /^https?:\/\//.test(ctaLink);

  return (
    <section id="top" className={styles.hero}>
      <div className={styles.bg} />
      {img ? (
        <div
          className={styles.bgImage}
          style={{ backgroundImage: `url(${img})` }}
        />
      ) : null}
      <div className={styles.scrim} />
      <div className={styles.frame} aria-hidden="true" />

      <div className={styles.content}>
        <h1 className={styles.headline}>{c.taglineEn}</h1>
        <div className={styles.divider} />
        <p className={styles.taglineAr}>{c.taglineAr}</p>
        <p className={styles.intro}>{c.intro}</p>
        <a
          href={ctaLink}
          className={styles.cta}
          {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        >
          {renderCta(c.cta)}
        </a>
      </div>

      {mark ? (
        <a href="#story" className={styles.markLink} aria-label="اكتشف المزيد">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={mark} alt="Piano" className={styles.markImg} />
        </a>
      ) : (
        <a href="#story" className={styles.scrollCue} aria-label="اكتشف المزيد">
          <span className={styles.scrollLine} />
        </a>
      )}
    </section>
  );
}
