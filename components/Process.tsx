import Reveal from "./Reveal";
import Icon from "./Icon";
import styles from "./Process.module.css";

const STEPS = [
  { n: "01", icon: "leaf", ar: "اختيار الكاكاو", desc: "ننتقي أجود حبوب الكاكاو الفرنسية من مصادر موثوقة." },
  { n: "02", icon: "harmony", ar: "تأليف النكهة", desc: "نوازن النكهات كما تُؤلَّف مقطوعة موسيقية متكاملة." },
  { n: "03", icon: "sparkle", ar: "الصياغة اليدوية", desc: "تُشكَّل كل قطعة يدويًا بدقّة وإتقان عاليين." },
  { n: "04", icon: "gift", ar: "التغليف الفني", desc: "نُغلّف القطع بتصميمٍ يليق بقيمتها وذوق مُقتنيها." },
] as const;

export default function Process() {
  return (
    <section id="craft" className={styles.process}>
      <div className="container">
        <div className={styles.head}>
          <Reveal>
            <p className="eyebrow">الحِرفة</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className={styles.title}>
              من الحبّة إلى <span className="goldtext">التحفة</span>
            </h2>
          </Reveal>
        </div>

        <ol className={styles.timeline}>
          <span className={styles.line} aria-hidden="true" />
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.n} className={styles.step} delay={i * 90}>
              <span className={styles.dot} aria-hidden="true">
                <Icon name={s.icon} size={24} />
              </span>
              <span className={styles.num}>{s.n}</span>
              <h3 className={styles.stepTitle}>{s.ar}</h3>
              <p className={styles.stepDesc}>{s.desc}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
