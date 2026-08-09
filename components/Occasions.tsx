import Motif from "./Motif";
import Reveal from "./Reveal";
import styles from "./Occasions.module.css";
import { content } from "./siteContent";

export default function Occasions() {
  const c = content.occasions;
  return (
    <section id="occasions" className={styles.section}>
      <div className={styles.inner}>
        <Reveal className={styles.heading}>
          <span className={styles.eyebrow}>{c.eyebrow}</span>
          <h2 className={styles.title}>{c.title}</h2>
          <p className={styles.subtitle}>{c.subtitle}</p>
        </Reveal>
        <div className={`${styles.grid} grid3`}>
          {c.items.map((o) => (
            <Reveal key={o.en} className={styles.card}>
              <Motif variant="small" style={{ marginBottom: 6 }} />
              <h3 className={styles.ar}>{o.ar}</h3>
              <span className={styles.en}>{o.en}</span>
              <p className={styles.desc}>{o.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
