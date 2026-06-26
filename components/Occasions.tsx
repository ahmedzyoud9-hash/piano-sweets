import Reveal from "./Reveal";
import Icon from "./Icon";
import styles from "./Occasions.module.css";

const OCCASIONS = [
  { icon: "user", ar: "الأفراد", en: "INDIVIDUALS", desc: "دلّل نفسك أو أحبّتك بلحظة من الفخامة الخالصة." },
  { icon: "building", ar: "الشركات", en: "CORPORATE", desc: "هدايا مؤسسية راقية تعكس ذوق علامتك وتقديرك." },
  { icon: "gift", ar: "الإهداء", en: "GIFTING", desc: "علب مخصّصة لكل مناسبة، تترك أثرًا لا يُنسى." },
] as const;

export default function Occasions() {
  return (
    <section id="occasions" className={styles.occasions}>
      <div className="container">
        <div className={styles.head}>
          <Reveal>
            <p className="eyebrow">المناسبات</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className={styles.title}>
              لكل لحظة <span className="goldtext">نغمتها</span>
            </h2>
          </Reveal>
        </div>

        <div className={`${styles.grid} grid3`}>
          {OCCASIONS.map((o, i) => (
            <Reveal key={o.en} variant="up" delay={i * 90} className={styles.card}>
              <span className={styles.iconWrap}>
                <Icon name={o.icon} size={28} />
              </span>
              <span className={styles.cardEn}>{o.en}</span>
              <h3 className={styles.cardAr}>{o.ar}</h3>
              <p className={styles.cardDesc}>{o.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
