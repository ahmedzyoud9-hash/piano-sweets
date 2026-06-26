"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Icon from "./Icon";
import styles from "./Hero.module.css";

const NOTES = [
  { left: "12%", delay: "0s", dur: "7s", size: 22 },
  { left: "26%", delay: "2.4s", dur: "9s", size: 16 },
  { left: "44%", delay: "1.1s", dur: "8s", size: 28 },
  { left: "63%", delay: "3.2s", dur: "10s", size: 18 },
  { left: "78%", delay: "0.6s", dur: "7.5s", size: 24 },
  { left: "89%", delay: "2s", dur: "9.5s", size: 14 },
];

const KEYS = Array.from({ length: 18 });

export default function Hero() {
  const [y, setY] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setY(window.scrollY));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="top" className={styles.hero}>
      {/* animated ambient background */}
      <div className={styles.blobA} aria-hidden="true" />
      <div className={styles.blobB} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />

      {/* floating music notes */}
      <div className={styles.notes} aria-hidden="true">
        {NOTES.map((n, i) => (
          <span
            key={i}
            className={styles.note}
            style={{
              left: n.left,
              animationDelay: n.delay,
              animationDuration: n.dur,
            }}
          >
            <Icon name="note" size={n.size} />
          </span>
        ))}
      </div>

      {/* content (subtle parallax) */}
      <div
        className={styles.content}
        style={{ transform: `translateY(${y * 0.18}px)`, opacity: Math.max(0, 1 - y / 600) }}
      >
        <span className={`${styles.crest} reveal-scale in`}>
          <Image src="/piano-logo.jpeg" alt="" width={84} height={84} className={styles.crestImg} priority />
        </span>

        <p className={`${styles.kicker} eyebrow`}>Maison de Chocolat · Kuwait</p>

        <h1 className={styles.title}>
          <span className={styles.line1}>شوكولا تُعزف</span>
          <span className={`${styles.line2} goldtext`}>كالموسيقى</span>
        </h1>

        <p className={styles.sub}>
          قطعٌ فاخرة من أجود الشوكولا الفرنسية، مؤلَّفة بانسجامٍ وذوقٍ رفيع —
          لتُهدى، وتُذكَر، وتبقى في الوجدان.
        </p>

        <div className={styles.actions}>
          <a href="#collections" className={styles.primary}>
            اكتشف المجموعات
            <span className={styles.primaryShine} aria-hidden="true" />
          </a>
          <a href="#story" className={styles.secondary}>قصّة بيانو</a>
        </div>
      </div>

      {/* animated piano keys baseline */}
      <div className={styles.keys} aria-hidden="true">
        {KEYS.map((_, i) => (
          <span
            key={i}
            className={styles.key}
            style={{ animationDelay: `${(i % 9) * 0.18}s` }}
          />
        ))}
      </div>

      <a href="#story" className={styles.scroll} aria-label="انتقل للأسفل">
        <span className={styles.scrollText}>تابِع</span>
        <Icon name="arrowDown" size={18} className={styles.scrollIcon} />
      </a>
    </section>
  );
}
