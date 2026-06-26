import Reveal from "./Reveal";
import TiltCard from "./TiltCard";
import Icon from "./Icon";
import styles from "./Collections.module.css";

const COLLECTIONS = [
  {
    num: "I",
    ar: "مجموعة التوقيع",
    en: "SIGNATURE NOTES",
    desc: "نكهاتنا الأصيلة التي عرّفت بيانو — انسجامٌ خالد من الكاكاو الفرنسي.",
    icon: "note",
  },
  {
    num: "II",
    ar: "الإهداء الفاخر",
    en: "GIFTING SUITE",
    desc: "علب مصمّمة بعناية، تجمع الفخامة والتغليف الفني لأرقى المناسبات.",
    icon: "gift",
  },
  {
    num: "III",
    ar: "مناسبات مميّزة",
    en: "CELEBRATIONS",
    desc: "تشكيلات حصرية تُصاغ خصيصًا لتجعل لحظاتك الكبرى لا تُنسى.",
    icon: "sparkle",
  },
] as const;

export default function Collections() {
  return (
    <section id="collections" className={styles.collections}>
      <div className="container">
        <div className={styles.head}>
          <Reveal>
            <p className="eyebrow">المجموعات</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className={styles.title}>
              ثلاث <span className="goldtext">مقطوعات</span> من الذوق
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className={styles.lead}>
              كل مجموعة قصة قائمة بذاتها — اختر ما يناسب لحظتك.
            </p>
          </Reveal>
        </div>

        <div className={`${styles.grid} grid3`}>
          {COLLECTIONS.map((c, i) => (
            <Reveal key={c.en} variant="up" delay={i * 90}>
              <TiltCard className={styles.card}>
                <div className={styles.shot}>
                  <span className={styles.roman}>{c.num}</span>
                  <span className={styles.shotIcon}>
                    <Icon name={c.icon} size={30} />
                  </span>
                  <span className={styles.sheen} aria-hidden="true" />
                </div>
                <div className={styles.cardBody}>
                  <span className={styles.cardEn}>{c.en}</span>
                  <h3 className={styles.cardAr}>{c.ar}</h3>
                  <p className={styles.cardDesc}>{c.desc}</p>
                  <a href="#enquiry" className={styles.link}>
                    استفسر
                    <Icon name="arrowLeft" size={16} className={styles.linkIcon} />
                  </a>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
