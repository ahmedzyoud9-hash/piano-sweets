"use client";

import { useEffect, useState } from "react";
import styles from "./Nav.module.css";

const NAV_LINKS = [
  { label: "قصتنا", href: "#story" },
  { label: "الفلسفة", href: "#philosophy" },
  { label: "المؤسس", href: "#founder" },
  { label: "المجموعات", href: "#collections" },
  { label: "اطلب", href: "#enquiry" },
  { label: "تواصل", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      id="topnav"
      className={`${styles.nav}${scrolled ? ` ${styles.scrolled}` : ""}`}
    >
      <a href="#top" onClick={goTop} className={styles.brand}>
        <span className={styles.brandPiano}>PIANO</span>
        <span className={styles.brandSweets}>SWEETS</span>
      </a>
      <nav className={`${styles.links} navlinks`}>
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} className={styles.link}>
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
