import styles from "./Hero.module.css";

export default function Hero() {
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/piano-logo.jpeg" alt="Piano Sweets" className={styles.logo} />
        </div>
        <div className={styles.divider} />
        <p className={styles.taglineEn}>Composed like music</p>
        <p className={styles.taglineAr}>مؤلَّفة كالموسيقى</p>
        <p className={styles.intro}>
          شوكولا فاخرة تتحوّل إلى تجربة عاطفية — حيث تُصاغ كل نكهة بتوازنٍ ودِفءٍ
          وأناقة، تماماً كما تُؤلَّف الموسيقى.
        </p>
        <a href="#story" className={styles.cta}>
          DISCOVER PIANO
        </a>
      </div>
    </section>
  );
}
