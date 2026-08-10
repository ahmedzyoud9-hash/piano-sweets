"use client";

import { useEffect, useState } from "react";
import styles from "./Nav.module.css";

const NAV_LINKS = [
  { label: "Our Story", href: "#story" },
  { label: "Philosophy", href: "#philosophy" },
  { label: "Founder", href: "#founder" },
  { label: "Collections", href: "#collections" },
  { label: "Order", href: "#enquiry" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const goTop = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <header
        id="topnav"
        className={`${styles.nav}${scrolled ? ` ${styles.scrolled}` : ""}`}
      >
        <a href="#top" onClick={goTop} className={styles.brand}>
          <span className={styles.brandSweets}>CHOCOLATE</span>
          <span className={styles.brandPiano}>PIANO</span>
        </a>

        <nav className={`${styles.links} navlinks`}>
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className={styles.link}>
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className={`${styles.burger}${menuOpen ? ` ${styles.burgerOpen}` : ""}`}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      {/* Rendered outside the header so the nav's backdrop-filter doesn't
          trap this fixed overlay inside the small top bar. */}
      <div
        className={`${styles.mobileMenu}${menuOpen ? ` ${styles.mobileMenuOpen}` : ""}`}
      >
        <nav className={styles.mobileLinks}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={styles.mobileLink}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
