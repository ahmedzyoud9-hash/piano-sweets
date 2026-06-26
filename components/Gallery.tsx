"use client";

import { useEffect, useState } from "react";
import Reveal from "./Reveal";
import styles from "./Gallery.module.css";

type GalleryImage = { url: string; pathname: string };

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    let active = true;
    fetch("/api/images", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (active) setImages(data.images ?? []);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  // Hide the whole section until there is something to show.
  if (images.length === 0) return null;

  return (
    <section id="gallery" className={styles.section}>
      <div className={styles.inner}>
        <Reveal className={styles.heading}>
          <span className={styles.eyebrow}>GALLERY</span>
          <h2 className={styles.title}>المعرض</h2>
          <p className={styles.tagline}>أحدث إبداعاتنا.</p>
        </Reveal>
        <div className={styles.grid}>
          {images.map((img) => (
            <Reveal key={img.pathname} className={styles.item}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.url} alt="Piano Sweets" loading="lazy" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
