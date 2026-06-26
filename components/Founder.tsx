import Motif from "./Motif";
import Reveal from "./Reveal";
import styles from "./Founder.module.css";

export default function Founder() {
  return (
    <section id="founder" className={styles.section}>
      <div className={`${styles.inner} grid2`}>
        <Reveal className={styles.portrait}>
          <div className={styles.portraitInner}>
            <Motif variant="large" />
            <p className={styles.portraitLabel}>FOUNDER PORTRAIT</p>
          </div>
        </Reveal>
        <Reveal>
          <span className={styles.eyebrow}>THE FOUNDER</span>
          <h2 className={styles.title}>
            شوكولاتييه
            <br />
            وعازف بيانو
          </h2>
          <div className={styles.divider} />
          <p className={styles.body}>
            آمن مؤسّس بيانو دائماً بأن جمال الموسيقى يكمن في الانسجام، حيث
            تتآلف كل نوتة مع الأخرى لتخلق عاطفةً وتجربةً لا تُنسى. ومن هذه
            الفلسفة وُلدت بيانو.
          </p>
          <p className={`${styles.body} ${styles.bodySpaced}`}>
            فبمقاربته للشوكولا كما يقارب الموسيقيّ التأليف، يصوغ النكهات
            بتوازنٍ وعمقٍ وقوامٍ وأناقة، محوّلاً كل مجموعةٍ إلى تجربةٍ حسية
            مستوحاة من الموسيقى ذاتها.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
