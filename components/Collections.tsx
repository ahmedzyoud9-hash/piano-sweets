import Reveal from "./Reveal";
import styles from "./Collections.module.css";
import { content, Picture } from "./siteContent";

export default function Collections() {
  const c = content.collections;
  const visible = c.items.filter((item) => item.enabled !== false);
  if (visible.length === 0) return null;
  const countClass = styles[`count${Math.min(visible.length, 3)}`];

  return (
    <section id="collections" className={styles.section}>
      <div className={styles.inner}>
        <Reveal className={styles.heading}>
          <span className={styles.eyebrow}>{c.eyebrow}</span>
          <h2 className={styles.title}>{c.title}</h2>
          <p className={styles.tagline}>{c.tagline}</p>
        </Reveal>
        <div className={`${styles.grid} ${countClass}`}>
          {visible.map((item) => (
            <Reveal key={item.num} className={styles.card}>
              <div className={styles.shot}>
                <Picture image={item.image} alt={item.ar} className={styles.shotImg} />
                <span className={styles.numeral}>{item.num}</span>
              </div>
              <h3 className={styles.cardTitle}>{item.ar}</h3>
              <span className={styles.cardEn}>{item.en}</span>
              <p className={styles.cardDesc}>{item.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
