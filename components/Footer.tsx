import Link from "next/link";
import Reveal from "./Reveal";
import styles from "./Footer.module.css";
import { content } from "./siteContent";

export default function Footer() {
  const c = content.footer;
  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.inner}>
        <div className={`${styles.grid} footgrid`}>
          <Reveal>
            <div className={styles.brand}>
              <span className={styles.brandSweets}>CHOCOLATE</span>
              <span className={styles.brandPiano}>PIANO</span>
            </div>
            <p className={styles.blurb}>{c.blurb}</p>
          </Reveal>
          <Reveal className={styles.col}>
            <span className={styles.colTitle}>{c.visitTitle}</span>
            <span className={styles.colText}>{c.visitAr}</span>
            <span className={`${styles.colText} ${styles.colTextLtr}`}>
              {c.visitEn}
            </span>
          </Reveal>
          <Reveal className={styles.col}>
            <span className={styles.colTitle}>{c.connectTitle}</span>
            <a href="#" className={styles.colLink}>Instagram</a>
            <a href="#" className={styles.colLink}>WhatsApp</a>
            <a href="#enquiry" className={styles.colLink}>Enquiries</a>
          </Reveal>
        </div>
        <div className={styles.bottom}>
          <span className={styles.copyright}>{c.copyright}</span>
          <div className={styles.bottomRight}>
            <Link href="/admin" className={styles.adminLink}>
              لوحة الإدارة
            </Link>
            <span className={styles.tagline}>{c.tagline}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
