import Reveal from "./Reveal";
import styles from "./QuoteBanner.module.css";

export default function QuoteBanner() {
  return (
    <section className={styles.section}>
      <Reveal>
        <p className={styles.quote}>“Where emotion inspires creation.”</p>
      </Reveal>
      <Reveal>
        <p className={styles.translation}>حيث تُلهم العاطفة الإبداع</p>
      </Reveal>
    </section>
  );
}
