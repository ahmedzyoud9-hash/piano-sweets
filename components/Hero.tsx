import styles from "./Hero.module.css";
import { content } from "./siteContent";

export default function Hero() {
  const c = content.hero;
  const img = c.logo?.web || "";
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
          {c.cta}
        </a>
      </div>

      <a href="#story" className={styles.scrollCue} aria-label="اكتشف المزيد">
        <span className={styles.scrollLine} />
      </a>
    </section>
  );
}
