import Icon from "./Icon";
import styles from "./Marquee.module.css";

const WORDS = [
  "شوكولا فرنسية فاخرة",
  "صناعة يدوية",
  "تغليف فني",
  "هدايا المناسبات",
  "نكهات مؤلَّفة",
  "تجربة حسّية",
];

export default function Marquee() {
  const items = [...WORDS, ...WORDS];
  return (
    <div className={styles.wrap} aria-hidden="true">
      <div className={styles.track}>
        {items.map((w, i) => (
          <span key={i} className={styles.item}>
            <Icon name="sparkle" size={16} className={styles.icon} />
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}
