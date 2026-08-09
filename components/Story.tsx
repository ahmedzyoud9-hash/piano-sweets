import Reveal from "./Reveal";
import styles from "./Story.module.css";
import { content, highlightBrand, lines } from "./siteContent";

export default function Story() {
  const c = content.story;
  return (
    <section id="story" className={styles.section}>
      <div className={styles.inner}>
        <Reveal className={styles.heading}>
          <span className={styles.eyebrow}>{c.eyebrow}</span>
          <h2 className={styles.title}>{c.title}</h2>
          <div className={styles.divider} />
        </Reveal>
        <Reveal>
          <p className={styles.body}>{highlightBrand(c.body, styles.brandName)}</p>
        </Reveal>
        <Reveal>
          <p className={styles.quote}>{lines(c.quote)}</p>
        </Reveal>
      </div>
    </section>
  );
}
