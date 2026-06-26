import Image from "next/image";
import Reveal from "./Reveal";
import Counter from "./Counter";
import styles from "./Story.module.css";

const STATS = [
  { to: 100, suffix: "%", label: "شوكولا فرنسية" },
  { to: 24, suffix: "+", label: "نكهة موقّعة" },
  { to: 7, suffix: "", label: "سنوات من الحِرفة" },
];

export default function Story() {
  return (
    <section id="story" className={styles.story}>
      <div className={`${styles.inner} container`}>
        <Reveal className={styles.media} variant="scale">
          <div className={styles.frame}>
            <Image
              src="/piano-logo.jpeg"
              alt="شعار بيانو سويتس"
              width={520}
              height={520}
              className={styles.img}
            />
            <span className={styles.ring} aria-hidden="true" />
            <span className={styles.badge}>
              <span className={styles.badgeTop}>EST.</span>
              <span className={styles.badgeNum}>2019</span>
            </span>
          </div>
        </Reveal>

        <div className={styles.text}>
          <Reveal>
            <p className="eyebrow">قصّة العلامة</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className={styles.title}>
              حيث تلتقي الحلوى <br />
              <span className="goldtext">بالموسيقى</span>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className={styles.body}>
              وُلدت «بيانو» من فكرةٍ بسيطة: أن تكون كل قطعة شوكولا مقطوعةً موسيقية
              متكاملة — نغمةٌ من المرارة، ولمسةٌ من الحلاوة، وخاتمةٌ تبقى في الذاكرة.
              نختار أرقى أنواع الكاكاو الفرنسي، ونصوغه يدويًا بانسجامٍ تامّ بين النكهة
              والشكل والإحساس.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <blockquote className={styles.quote}>
              “Where emotion inspires creation.”
            </blockquote>
          </Reveal>

          <Reveal delay={280}>
            <div className={styles.stats}>
              {STATS.map((s) => (
                <div key={s.label} className={styles.stat}>
                  <span className={styles.statNum}>
                    <Counter to={s.to} suffix={s.suffix} />
                  </span>
                  <span className={styles.statLabel}>{s.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
