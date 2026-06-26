import Reveal from "./Reveal";
import Icon from "./Icon";
import styles from "./Philosophy.module.css";

type Value = {
  icon: "harmony" | "crown" | "heart" | "sparkle" | "leaf" | "note";
  ar: string;
  en: string;
  desc: string;
  big?: boolean;
  wide?: boolean;
};

const VALUES: Value[] = [
  { icon: "harmony", ar: "الانسجام", en: "HARMONY", desc: "توازنٌ دقيق بين النكهات يُطرب الحواس.", big: true },
  { icon: "crown", ar: "الرُقيّ", en: "SOPHISTICATION", desc: "تفاصيل راقية في كل قطعة." },
  { icon: "heart", ar: "العاطفة", en: "EMOTION", desc: "حلوى تُلامس المشاعر." },
  { icon: "sparkle", ar: "الحِرفية", en: "CRAFTSMANSHIP", desc: "صناعة يدوية بإتقان." },
  { icon: "leaf", ar: "النقاء", en: "PURITY", desc: "مكوّنات أصيلة مختارة بعناية." },
  { icon: "note", ar: "التجربة الحسّية", en: "SENSORY", desc: "رحلة تذوّق متكاملة.", wide: true },
];

export default function Philosophy() {
  return (
    <section id="philosophy" className={styles.philosophy}>
      <div className="container">
        <div className={styles.head}>
          <Reveal>
            <p className="eyebrow">فلسفتنا</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className={styles.title}>
              ستّ قيمٍ <span className="goldtext">تُعزف</span> في كل قطعة
            </h2>
          </Reveal>
        </div>

        <div className={styles.bento}>
          {VALUES.map((v, i) => (
            <Reveal
              key={v.en}
              variant="up"
              delay={i * 60}
              className={`${styles.card} ${v.big ? styles.big : ""} ${v.wide ? styles.wide : ""}`}
            >
              <span className={styles.iconWrap}>
                <Icon name={v.icon} size={v.big ? 34 : 26} />
              </span>
              <div className={styles.cardText}>
                <span className={styles.cardEn}>{v.en}</span>
                <h3 className={styles.cardAr}>{v.ar}</h3>
                <p className={styles.cardDesc}>{v.desc}</p>
              </div>
              <span className={styles.glow} aria-hidden="true" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
