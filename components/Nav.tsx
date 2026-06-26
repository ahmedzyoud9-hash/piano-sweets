"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Nav.module.css";

const LINKS = [
  { id: "story", label: "قصتنا" },
  { id: "philosophy", label: "الفلسفة" },
  { id: "collections", label: "المجموعات" },
  { id: "craft", label: "الحِرفة" },
  { id: "occasions", label: "المناسبات" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(
      Boolean
    ) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <div className={`${styles.inner} container`}>
        <a href="#top" className={styles.brand} aria-label="بيانو سويتس — الصفحة الرئيسية">
          <Image
            src="/piano-logo.jpeg"
            alt=""
            width={40}
            height={40}
            className={styles.logo}
          />
          <span className={styles.brandText}>
            <span className={styles.brandTop}>PIANO</span>
            <span className={styles.brandBot}>SWEETS</span>
          </span>
        </a>

        <nav className={styles.links} aria-label="التنقّل الرئيسي">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={`${styles.link} ${active === l.id ? styles.linkActive : ""}`}
              aria-current={active === l.id ? "true" : undefined}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a href="#enquiry" className={styles.cta}>
          اطلب الآن
          <span className={styles.ctaShine} aria-hidden="true" />
        </a>

        <button
          className={styles.burger}
          aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`${styles.burgerLine} ${open ? styles.b1 : ""}`} />
          <span className={`${styles.burgerLine} ${open ? styles.b2 : ""}`} />
          <span className={`${styles.burgerLine} ${open ? styles.b3 : ""}`} />
        </button>
      </div>

      <div className={`${styles.sheet} ${open ? styles.sheetOpen : ""}`}>
        {LINKS.map((l) => (
          <a key={l.id} href={`#${l.id}`} onClick={() => setOpen(false)} className={styles.sheetLink}>
            {l.label}
          </a>
        ))}
        <a href="#enquiry" onClick={() => setOpen(false)} className={styles.sheetCta}>
          اطلب الآن
        </a>
      </div>
    </header>
  );
}
