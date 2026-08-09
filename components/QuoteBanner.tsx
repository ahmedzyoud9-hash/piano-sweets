import Reveal from "./Reveal";
import styles from "./QuoteBanner.module.css";
import { content } from "./siteContent";

export default function QuoteBanner() {
  const c = content.quoteBanner;
  return (
    <section className={styles.section}>
      <Reveal>
        <p className={styles.quote}>{c.quote}</p>
      </Reveal>
      <Reveal>
        <p className={styles.translation}>{c.translation}</p>
      </Reveal>
    </section>
  );
}
