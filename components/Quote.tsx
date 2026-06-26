import Reveal from "./Reveal";
import Icon from "./Icon";
import styles from "./Quote.module.css";

export default function Quote() {
  return (
    <section className={styles.quote}>
      <div className={styles.glowA} aria-hidden="true" />
      <div className={styles.glowB} aria-hidden="true" />
      <div className="container">
        <Reveal variant="blur" className={styles.inner}>
          <Icon name="note" size={36} className={styles.mark} />
          <p className={styles.en}>Where emotion inspires creation.</p>
          <p className={styles.ar}>حيث تُلهم العاطفة الإبداع</p>
        </Reveal>
      </div>
    </section>
  );
}
