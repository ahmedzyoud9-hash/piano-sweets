import Reveal from "./Reveal";
import styles from "./Collections.module.css";

const COLLECTIONS = [
  { num: "I", ar: "مجموعة التوقيع", en: "SIGNATURE NOTES", desc: "نكهاتٌ كلاسيكية مؤلَّفة بعنايةٍ تعزف لحن بيانو الأصيل.", img: "/products/collection-1.jpg" },
  { num: "II", ar: "الإهداء الفاخر", en: "GIFTING SUITE", desc: "علبٌ أنيقة تجمع بين الفنّ والفخامة لمناسباتك الخاصة.", img: "/products/collection-2.jpg" },
  { num: "III", ar: "مناسبات مميزة", en: "CELEBRATIONS", desc: "تشكيلاتٌ للأعراس والمناسبات تصنع لحظاتٍ لا تُنسى.", img: "/products/collection-3.jpg" },
];

export default function Collections() {
  return (
    <section id="collections" className={styles.section}>
      <div className={styles.inner}>
        <Reveal className={styles.heading}>
          <span className={styles.eyebrow}>COLLECTIONS</span>
          <h2 className={styles.title}>المجموعات</h2>
          <p className={styles.tagline}>Every flavor plays a different note.</p>
        </Reveal>
        <div className={`${styles.grid} grid3`}>
          {COLLECTIONS.map((c) => (
            <Reveal key={c.num} className={styles.card}>
              <div className={styles.shot}>
                <img src={c.img} alt={c.ar} className={styles.shotImg} loading="lazy" />
                <span className={styles.numeral}>{c.num}</span>
              </div>
              <h3 className={styles.cardTitle}>{c.ar}</h3>
              <span className={styles.cardEn}>{c.en}</span>
              <p className={styles.cardDesc}>{c.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
