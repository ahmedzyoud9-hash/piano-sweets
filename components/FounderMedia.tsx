"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Founder.module.css";
import type { ImageField } from "./siteContent";

type Media = {
  type: string;
  image: ImageField;
  video: string;
};

type Resolved =
  | { kind: "file"; src: string }
  | { kind: "iframe"; src: string; autoplaySrc: string; soundSrc: string };

// Resolves an editable video link into how it should be embedded, with a
// muted-autoplay variant (for scroll autoplay) and a with-sound variant
// (swapped in on a user tap, which browsers allow to play unmuted).
function resolveVideo(url: string): Resolved {
  const yt = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]+)/
  );
  if (yt) {
    const base = `https://www.youtube.com/embed/${yt[1]}?rel=0&playsinline=1&loop=1&playlist=${yt[1]}`;
    return {
      kind: "iframe",
      src: base,
      autoplaySrc: `${base}&autoplay=1&mute=1`,
      soundSrc: `${base}&autoplay=1`,
    };
  }
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) {
    const base = `https://player.vimeo.com/video/${vimeo[1]}?loop=1`;
    return {
      kind: "iframe",
      src: base,
      autoplaySrc: `${base}&autoplay=1&muted=1`,
      soundSrc: `${base}&autoplay=1`,
    };
  }
  const streamable = url.match(/streamable\.com\/(?:e\/)?([\w-]+)/);
  if (streamable) {
    const base = `https://streamable.com/e/${streamable[1]}?loop=1`;
    return {
      kind: "iframe",
      src: base,
      autoplaySrc: `${base}&autoplay=1&muted=1`,
      soundSrc: `${base}&autoplay=1`,
    };
  }
  return { kind: "file", src: url };
}

export default function FounderMedia({ media }: { media: Media }) {
  const showVideo = media.type === "video" && !!media.video;
  const video = showVideo ? resolveVideo(media.video) : null;

  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const [sound, setSound] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || !video) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.35 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [video]);

  useEffect(() => {
    if (inView && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [inView]);

  // Image mode — keep the elegant 4:5 portrait frame.
  if (!video) {
    return (
      <div className={styles.portrait}>
        <picture>
          {media.image.mobile ? (
            <source media="(max-width: 760px)" srcSet={media.image.mobile} />
          ) : null}
          <img
            src={media.image.web}
            alt="مؤسّس بيانو"
            className={styles.portraitImg}
            loading="lazy"
          />
        </picture>
      </div>
    );
  }

  const soundButton = (
    <button
      type="button"
      className={styles.soundBtn}
      aria-label={sound ? "كتم الصوت" : "تشغيل الصوت"}
      onClick={() => {
        const next = !sound;
        setSound(next);
        if (video.kind === "file" && videoRef.current) {
          videoRef.current.muted = !next;
          videoRef.current.play().catch(() => {});
        }
      }}
    >
      {sound ? "🔊 الصوت يعمل" : "🔇 اضغط للصوت"}
    </button>
  );

  // Direct video file — sizes to the video's own aspect ratio (no crop).
  if (video.kind === "file") {
    return (
      <div ref={ref} className={styles.videoBoxFile}>
        <video
          ref={videoRef}
          className={styles.videoFile}
          src={video.src}
          poster={media.image.web || undefined}
          muted={!sound}
          loop
          playsInline
          preload="metadata"
        />
        {soundButton}
      </div>
    );
  }

  // Embedded player (YouTube / Vimeo / Streamable) — 16:9 frame, autoplays on view.
  return (
    <div ref={ref} className={styles.videoBoxIframe}>
      {inView ? (
        <>
          <iframe
            className={styles.videoIframe}
            src={sound ? video.soundSrc : video.autoplaySrc}
            title="مؤسّس بيانو"
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
            allowFullScreen
          />
          {soundButton}
        </>
      ) : media.image.web ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={media.image.web}
          alt="مؤسّس بيانو"
          className={styles.videoIframe}
        />
      ) : null}
    </div>
  );
}
