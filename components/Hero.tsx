import styles from "./Hero.module.css";
import { content, Picture } from "./siteContent";

export default function Hero() {
  const c = content.hero;
  const ctaLink = c.ctaLink || "#story";
  const external = /^https?:\/\//.test(ctaLink);
  return (
    <section id="top" className={styles.hero}>
      <div className={styles.bg} />
      <div className={styles.strings} aria-hidden="true">
        <span className={styles.string} />
        <span className={styles.string} />
        <span className={styles.string} />
        <span className={styles.string} />
        <span className={styles.string} />
      </div>

      <div className={styles.content}>
        <div className={styles.logoFloat}>
          <Picture
            image={c.logo}
            alt="Piano Chocolate"
            className={styles.logo}
            loading="eager"
          />
        </div>
        <div className={styles.divider} />
        <p className={styles.taglineEn}>{c.taglineEn}</p>
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
    </section>
  );
}
