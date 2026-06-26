import Reveal from "./Reveal";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.inner}>
        <div className={`${styles.grid} footgrid`}>
          <Reveal>
            <div className={styles.brand}>
              <span className={styles.brandPiano}>PIANO</span>
              <span className={styles.brandSweets}>SWEETS</span>
            </div>
            <p className={styles.blurb}>
              شوكولا فاخرة مؤلَّفة كالموسيقى — من أجود الشوكولا الفرنسية،
              صُنعت لتُلهم وتُهدى وتبقى في الذاكرة.
            </p>
          </Reveal>
          <Reveal className={styles.col}>
            <span className={styles.colTitle}>VISIT US</span>
            <span className={styles.colText}>مجمع الغوالي — الكويت</span>
            <span className={`${styles.colText} ${styles.colTextLtr}`}>
              Al Ghawali Complex, Kuwait
            </span>
          </Reveal>
          <Reveal className={styles.col}>
            <span className={styles.colTitle}>CONNECT</span>
            <a href="#" className={styles.colLink}>Instagram</a>
            <a href="#" className={styles.colLink}>WhatsApp</a>
            <a href="#enquiry" className={styles.colLink}>Enquiries</a>
          </Reveal>
        </div>
        <div className={styles.bottom}>
          <span className={styles.copyright}>© 2026 PIANO SWEETS · ALL RIGHTS RESERVED</span>
          <span className={styles.tagline}>Crafted in harmony.</span>
        </div>
      </div>
    </footer>
  );
}
