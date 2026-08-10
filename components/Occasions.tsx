import Motif from "./Motif";
import Reveal from "./Reveal";
import styles from "./Occasions.module.css";
import { content, Picture } from "./siteContent";

// Symbolic icons an occasion can carry (chosen from the admin panel).
const OCC_ICONS: Record<string, React.ReactNode> = {
  person: (
    <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm-8 9a8 8 0 0 1 16 0 1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z" />
  ),
  users: (
    <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm8 0a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-8 2c-3.3 0-6 2-6 4.5V21h12v-2.5C14 16 11.3 14 8 14Zm8 0c-.6 0-1.2.06-1.7.17C15.9 15.2 17 16.7 17 18.5V21h5v-2.5C22 16 19.3 14 16 14Z" />
  ),
  building: (
    <path d="M4 21V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v6h5a1 1 0 0 1 1 1v10h-6v-4h-2v4H4Zm3-12h2V7H7v2Zm4 0h2V7h-2v2Zm-4 4h2v-2H7v2Zm4 0h2v-2h-2v2Zm6 0h2v-2h-2v2Zm0 4h2v-2h-2v2Z" />
  ),
  briefcase: (
    <path d="M9 4a2 2 0 0 0-2 2v1H4a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1h-3V6a2 2 0 0 0-2-2H9Zm0 3V6h6v1H9Z" />
  ),
  gift: (
    <path d="M20 7h-2.2a3 3 0 0 0-4.3-4A3 3 0 0 0 12 4.3 3 3 0 0 0 6.2 7H4a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-8h1a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1Zm-5-3a1 1 0 1 1 0 2h-1V5a1 1 0 0 1 1-1ZM9 4a1 1 0 0 1 1 1v1H9a1 1 0 1 1 0-2Zm2 16H7v-8h4v8Zm6 0h-4v-8h4v8Z" />
  ),
  heart: (
    <path d="M12 21s-7-4.35-9.5-8.5C1 9 2.5 5.5 6 5.5c2 0 3.2 1.2 4 2.3.8-1.1 2-2.3 4-2.3 3.5 0 5 3.5 3.5 7C19 16.65 12 21 12 21Z" />
  ),
  star: (
    <path d="m12 2 2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.9 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2Z" />
  ),
  cake: (
    <path d="M12 2.5c-.6.7-1 1.3-1 1.9a1 1 0 0 0 2 0c0-.6-.4-1.2-1-1.9ZM7 9a2 2 0 0 0-2 2v1.2c.7 0 1-.7 2-.7s1.3.7 2 .7 1-.7 2-.7 1.3.7 2 .7 1-.7 2-.7 1.3.7 2 .7V11a2 2 0 0 0-2-2H7Zm-2 5.8V20h14v-5.2c-.7 0-1 .7-2 .7s-1.3-.7-2-.7-1 .7-2 .7-1.3-.7-2-.7-1 .7-2 .7-1.3-.7-2-.7Z" />
  ),
  crown: (
    <path d="M3 8l3.5 3L12 5l5.5 6L21 8l-1.5 10h-15L3 8Zm2.7 8h12.6l.5-3.3-2.3 2-4.5-4.8-4.5 4.8-2.3-2 .5 3.3Z" />
  ),
};

export default function Occasions() {
  const c = content.occasions;
  const visible = c.items.filter(
    (o) => (o as { enabled?: boolean }).enabled !== false
  );
  if (visible.length === 0) return null;
  const countClass = styles[`count${Math.min(visible.length, 3)}`];

  return (
    <section id="occasions" className={styles.section}>
      <div className={styles.inner}>
        <Reveal className={styles.heading}>
          <span className={styles.eyebrow}>{c.eyebrow}</span>
          <h2 className={styles.title}>{c.title}</h2>
          <p className={styles.subtitle}>{c.subtitle}</p>
        </Reveal>
        <div className={`${styles.grid} ${countClass}`}>
          {visible.map((o) => {
            const link = o.link || "";
            const external = /^https?:\/\//.test(link);
            const icon = (o as { icon?: string }).icon || "";
            const image = (o as { image?: { web: string; mobile?: string } })
              .image;
            const hasImage = !!image?.web;
            return (
              <Reveal
                key={o.en}
                className={`${styles.card}${link ? ` ${styles.cardClickable}` : ""}`}
              >
                {icon && OCC_ICONS[icon] ? (
                  <div className={styles.occIcon}>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      {OCC_ICONS[icon]}
                    </svg>
                  </div>
                ) : hasImage ? (
                  <div className={styles.occImage}>
                    <Picture
                      image={image}
                      alt={o.ar}
                      className={styles.occImageInner}
                    />
                  </div>
                ) : (
                  <Motif variant="small" style={{ marginBottom: 6 }} />
                )}
                <h3 className={styles.ar}>{o.ar}</h3>
                <span className={styles.en}>{o.en}</span>
                <p className={styles.desc}>{o.desc}</p>
                {link ? (
                  <a
                    href={link}
                    className={styles.cardLink}
                    aria-label={o.ar}
                    {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                  />
                ) : null}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
