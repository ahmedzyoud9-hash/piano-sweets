import Image from "next/image";
import Reveal from "./Reveal";
import Icon from "./Icon";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer id="contact" className={styles.footer}>
      <div className="container">
        <div className={`${styles.grid} footgrid`}>
          <Reveal className={styles.brandCol}>
            <div className={styles.brand}>
              <Image src="/piano-logo.jpeg" alt="" width={48} height={48} className={styles.logo} />
              <span className={styles.brandText}>
                <span className={styles.bTop}>PIANO</span>
                <span className={styles.bBot}>SWEETS</span>
              </span>
            </div>
            <p className={styles.blurb}>
              شوكولا فاخرة مؤلَّفة كالموسيقى — من أجود الشوكولا الفرنسية،
              صُنعت لتُلهم وتُهدى وتبقى في الذاكرة.
            </p>
          </Reveal>

          <Reveal className={styles.col} delay={80}>
            <span className={styles.colTitle}>زورونا</span>
            <span className={styles.colText}>مجمع الغوالي — الكويت</span>
            <span className={`${styles.colText} ${styles.ltr}`}>Al Ghawali Complex, Kuwait</span>
          </Reveal>

          <Reveal className={styles.col} delay={140}>
            <span className={styles.colTitle}>تواصل</span>
            <a href="#" className={styles.social}><Icon name="instagram" size={18} /> Instagram</a>
            <a href="#" className={styles.social}><Icon name="whatsapp" size={18} /> WhatsApp</a>
            <a href="#enquiry" className={styles.social}><Icon name="note" size={18} /> اطلب الآن</a>
          </Reveal>
        </div>

        <div className={styles.bottom}>
          <span>© 2026 PIANO SWEETS · ALL RIGHTS RESERVED</span>
          <span className={styles.tag}>Crafted in harmony.</span>
        </div>
      </div>
    </footer>
  );
}
