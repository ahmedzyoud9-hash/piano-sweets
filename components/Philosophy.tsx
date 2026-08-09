import Reveal from "./Reveal";
import styles from "./Philosophy.module.css";
import { content } from "./siteContent";

// A distinct musical glyph per value so the cards don't all repeat one note.
const NOTES = ["♩", "♪", "♫", "♬", "♭", "♮"];

export default function Philosophy() {
  const c = content.philosophy;
  return (
    <section id="philosophy" className={styles.section}>
      <div className={styles.inner}>
        <Reveal className={styles.heading}>
          <span className={styles.eyebrow}>{c.eyebrow}</span>
          <h2 className={styles.title}>{c.title}</h2>
          <p className={styles.subtitle}>{c.subtitle}</p>
        </Reveal>
        <div className={`${styles.grid} grid3`}>
          {c.values.map((v, i) => (
            <Reveal key={v.en} className={styles.cell} delay={(i % 3) * 0.09}>
              <span className={styles.note}>{NOTES[i % NOTES.length]}</span>
              <h3 className={styles.ar}>{v.ar}</h3>
              <span className={styles.en}>{v.en}</span>
              <p className={styles.desc}>{v.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
