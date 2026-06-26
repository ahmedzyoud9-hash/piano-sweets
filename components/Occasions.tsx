import Motif from "./Motif";
import Reveal from "./Reveal";
import styles from "./Occasions.module.css";

const OCCASIONS = [
  { ar: "الأفراد", en: "INDIVIDUALS", desc: "لحظاتٌ حميمة تستحق نكهةً تليق بها." },
  { ar: "الشركات", en: "CORPORATE", desc: "إهداءٌ مؤسسيّ راقٍ يترك انطباعاً يدوم." },
  { ar: "الإهداء", en: "GIFTING", desc: "هديةٌ تعبّر عن التقدير بلغة العاطفة." },
];

export default function Occasions() {
  return (
    <section id="occasions" className={styles.section}>
      <div className={styles.inner}>
        <Reveal className={styles.heading}>
          <span className={styles.eyebrow}>OCCASIONS</span>
          <h2 className={styles.title}>المناسبات</h2>
          <p className={styles.subtitle}>تجربةٌ تبقى طويلاً بعد آخر نوتة</p>
        </Reveal>
        <div className={`${styles.grid} grid3`}>
          {OCCASIONS.map((o) => (
            <Reveal key={o.en} className={styles.card}>
              <Motif variant="small" style={{ marginBottom: 6 }} />
              <h3 className={styles.ar}>{o.ar}</h3>
              <span className={styles.en}>{o.en}</span>
              <p className={styles.desc}>{o.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
