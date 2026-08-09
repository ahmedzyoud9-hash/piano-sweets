"use client";

import { useEffect, useState } from "react";
import Reveal from "./Reveal";
import styles from "./Gallery.module.css";
import { content } from "./siteContent";

type GalleryImage = { url: string; pathname: string };

export default function Gallery() {
  const c = content.gallery;
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
          <span className={styles.eyebrow}>{c.eyebrow}</span>
          <h2 className={styles.title}>{c.title}</h2>
          <p className={styles.tagline}>{c.tagline}</p>
        </Reveal>
        <div className={styles.grid}>
          {images.map((img) => (
            <Reveal key={img.pathname} className={styles.item}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.url} alt="Piano Chocolate" loading="lazy" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
