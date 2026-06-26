import Reveal from "./Reveal";
import styles from "./Philosophy.module.css";

const VALUES = [
  { ar: "الانسجام", en: "HARMONY", desc: "توازنٌ دقيق بين النكهات والقوام، كما تتآلف النوتات في مقطوعة." },
  { ar: "الرُقيّ", en: "SOPHISTICATION", desc: "لمسةٌ راقية في كل تفصيل، من المكوّن إلى التقديم." },
  { ar: "العاطفة", en: "EMOTION", desc: "لغةٌ من المشاعر والتقدير تتجاوز كونها مجرّد هدية." },
  { ar: "الحِرفية", en: "CRAFTSMANSHIP", desc: "صناعةٌ يدوية متقنة بأجود الشوكولا الفرنسية." },
  { ar: "الفخامة الفنية", en: "ARTISTIC LUXURY", desc: "فنٌّ وفخامة يجتمعان في تجربةٍ بصرية وحسية." },
  { ar: "التجربة الحسية", en: "SENSORY EXPERIENCE", desc: "لحظاتٌ تُعاش بكل الحواس وتبقى طويلاً في الذاكرة." },
];

export default function Philosophy() {
  return (
    <section id="philosophy" className={styles.section}>
      <div className={styles.inner}>
        <Reveal className={styles.heading}>
          <span className={styles.eyebrow}>BRAND DNA</span>
          <h2 className={styles.title}>الفلسفة</h2>
          <p className={styles.subtitle}>انسجامٌ يجمع بين الفنّ والعاطفة والفخامة</p>
        </Reveal>
        <div className={`${styles.grid} grid3`}>
          {VALUES.map((v, i) => (
            <Reveal key={v.en} className={styles.cell} delay={(i % 3) * 0.09}>
              <span className={styles.note}>♪</span>
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
