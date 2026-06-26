"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Loader.module.css";

/** Intro curtain: logo fades/scales in, then the panel lifts away. */
export default function Loader() {
  const [stage, setStage] = useState<"in" | "lift" | "gone">("in");

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- immediate skip for reduced-motion users
      setStage("gone");
      return;
    }
    const t1 = setTimeout(() => setStage("lift"), 1250);
    const t2 = setTimeout(() => setStage("gone"), 2050);
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (stage === "gone") document.body.style.overflow = "";
  }, [stage]);

  if (stage === "gone") return null;

  return (
    <div
      className={`${styles.loader} ${stage === "lift" ? styles.lift : ""}`}
      aria-hidden="true"
    >
      <div className={styles.inner}>
        <Image
          src="/piano-logo.jpeg"
          alt=""
          width={96}
          height={96}
          className={styles.logo}
          priority
        />
        <span className={styles.word}>PIANO&nbsp;SWEETS</span>
        <span className={styles.bar}>
          <span className={styles.fill} />
        </span>
      </div>
    </div>
  );
}
