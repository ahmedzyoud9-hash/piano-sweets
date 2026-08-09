import Reveal from "./Reveal";
import styles from "./Founder.module.css";
import { content, lines, Picture } from "./siteContent";

// Resolves an editable video link into how it should be rendered:
// a YouTube/Vimeo embed iframe, or a direct video file.
function resolveVideo(url: string): { kind: "iframe" | "file"; src: string } {
  const yt = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]+)/
  );
  if (yt) {
    return {
      kind: "iframe",
      src: `https://www.youtube.com/embed/${yt[1]}?rel=0&playsinline=1`,
    };
  }
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) {
    return { kind: "iframe", src: `https://player.vimeo.com/video/${vimeo[1]}` };
  }
  return { kind: "file", src: url };
}

export default function Founder() {
  const c = content.founder;
  const media = c.media;
  const showVideo = media.type === "video" && !!media.video;
  const video = showVideo ? resolveVideo(media.video) : null;

  return (
    <section id="founder" className={styles.section}>
      <div className={`${styles.inner} grid2`}>
        <Reveal className={styles.portrait}>
          {video ? (
            video.kind === "iframe" ? (
              <iframe
                className={styles.portraitImg}
                src={video.src}
                title="مؤسّس بيانو"
                allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                allowFullScreen
              />
            ) : (
              <video
                className={styles.portraitImg}
                src={video.src}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
            )
          ) : (
            <Picture
              image={media.image}
              alt="مؤسّس بيانو"
              className={styles.portraitImg}
            />
          )}
        </Reveal>
        <Reveal>
          <span className={styles.eyebrow}>{c.eyebrow}</span>
          <h2 className={styles.title}>{lines(c.title)}</h2>
          <div className={styles.divider} />
          <p className={styles.body}>{c.body1}</p>
          <p className={`${styles.body} ${styles.bodySpaced}`}>{c.body2}</p>
        </Reveal>
      </div>
    </section>
  );
}
