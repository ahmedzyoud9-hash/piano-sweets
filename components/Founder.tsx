import FounderMedia from "./FounderMedia";
import Reveal from "./Reveal";
import styles from "./Founder.module.css";
import { content, lines } from "./siteContent";

export default function Founder() {
  const c = content.founder;

  return (
    <section id="founder" className={styles.section}>
      <div className={`${styles.inner} grid2`}>
        <Reveal className={styles.mediaCol}>
          <FounderMedia media={c.media} />
        </Reveal>
        <Reveal>
          <span className={styles.eyebrow}>{c.eyebrow}</span>
          <h2 className={styles.title}>{lines(c.title)}</h2>
          <div className={styles.divider} />
          <p className={styles.body}>{c.body1}</p>
          <p className={`${styles.body} ${styles.bodySpaced}`}>{c.body2}</p>
        </Reveal>
      </div>
    </section>
  );
}
