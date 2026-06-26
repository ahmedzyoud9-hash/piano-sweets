import Reveal from "./Reveal";
import styles from "./Story.module.css";

export default function Story() {
  return (
    <section id="story" className={styles.section}>
      <div className={styles.inner}>
        <Reveal className={styles.heading}>
          <span className={styles.eyebrow}>OUR STORY</span>
          <h2 className={styles.title}>قصة العلامة</h2>
          <div className={styles.divider} />
        </Reveal>
        <Reveal>
          <p className={styles.body}>
            وُلدت <span className={styles.brandName}>بيانو</span> لتحوّل
            الشوكولا إلى تجربةٍ عاطفية. فكما تُؤلَّف كل مقطوعةٍ موسيقية
            بعناية لتخلق توازناً وجمالاً، تُصنع كل قطعةٍ من بيانو باستخدام
            أجود الشوكولا الفرنسية ومكوّناتٍ مُنتقاة، لتمنحك لحظاتٍ من
            الأناقة والدفء والفخامة.
          </p>
        </Reveal>
        <Reveal>
          <p className={styles.quote}>
            “At Piano, chocolate is more than a gift —<br />
            it is a language of emotion and unforgettable memories.”
          </p>
        </Reveal>
      </div>
    </section>
  );
}
