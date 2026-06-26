"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import styles from "./admin.module.css";

type UploadedImage = { url: string; pathname: string };

// Downscale + re-encode in the browser so uploads stay small (fast, and well
// under the serverless request-body limit).
async function resizeImage(file: File, maxDim = 1600, quality = 0.85): Promise<File> {
  if (!file.type.startsWith("image/")) return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, maxDim / Math.max(bitmap.width, bitmap.height));
    const w = Math.round(bitmap.width * scale);
    const h = Math.round(bitmap.height * scale);
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, w, h);
    const blob: Blob | null = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", quality)
    );
    if (!blob) return file;
    return new File([blob], file.name.replace(/\.\w+$/, "") + ".jpg", {
      type: "image/jpeg",
    });
  } catch {
    return file;
  }
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(false);
  const [authError, setAuthError] = useState("");

  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [images, setImages] = useState<UploadedImage[]>([]);

  const loadImages = useCallback(async () => {
    try {
      const res = await fetch("/api/images", { cache: "no-store" });
      const data = await res.json();
      setImages(data.images ?? []);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (authed) loadImages();
  }, [authed, loadImages]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setAuthError("");
    setChecking(true);
    try {
      const res = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.ok) {
        setAuthed(true);
      } else {
        setAuthError(data.error || "كلمة السر غير صحيحة.");
      }
    } catch {
      setAuthError("تعذّر التحقق. حاول مرة أخرى.");
    } finally {
      setChecking(false);
    }
  }

  async function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    setUploading(true);
    setMessage("");
    setError("");
    let done = 0;

    try {
      for (const file of files) {
        const resized = await resizeImage(file);
        const body = new FormData();
        body.append("password", password);
        body.append("file", resized);
        const res = await fetch("/api/upload", { method: "POST", body });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || `فشل الرفع (${res.status}).`);
        }
        done += 1;
        setMessage(`تم رفع ${done} من ${files.length}…`);
      }
      setMessage(`تم رفع ${done} ${done === 1 ? "صورة" : "صور"} بنجاح ✓`);
      await loadImages();
    } catch (err) {
      setError((err as Error).message || "فشل الرفع.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  if (!authed) {
    return (
      <main className={styles.gate}>
        <form className={styles.gateCard} onSubmit={handleLogin}>
          <span className={styles.eyebrow}>ADMIN</span>
          <h1 className={styles.gateTitle}>لوحة الإدارة</h1>
          <p className={styles.gateHint}>أدخل كلمة السر للمتابعة.</p>
          <input
            type="password"
            className={styles.input}
            placeholder="كلمة السر"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
          {authError && <span className={styles.error}>{authError}</span>}
          <button className={styles.button} type="submit" disabled={checking}>
            {checking ? "جارٍ التحقق…" : "دخول"}
          </button>
          <Link href="/" className={styles.back}>
            ← العودة للموقع
          </Link>
        </form>
      </main>
    );
  }

  return (
    <main className={styles.panel}>
      <div className={styles.panelInner}>
        <header className={styles.header}>
          <div>
            <span className={styles.eyebrow}>ADMIN</span>
            <h1 className={styles.title}>إدارة صور المنتجات</h1>
          </div>
          <Link href="/" className={styles.back}>
            ← العودة للموقع
          </Link>
        </header>

        <label className={styles.dropzone}>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFiles}
            disabled={uploading}
            hidden
          />
          <span className={styles.dropIcon}>＋</span>
          <span className={styles.dropText}>
            {uploading ? "جارٍ الرفع…" : "اضغط لاختيار صور للرفع"}
          </span>
          <span className={styles.dropSub}>JPG · PNG · WEBP — حتى 15MB للصورة</span>
        </label>

        {message && <p className={styles.success}>{message}</p>}
        {error && <p className={styles.error}>{error}</p>}

        <h2 className={styles.subhead}>الصور المرفوعة ({images.length})</h2>
        {images.length === 0 ? (
          <p className={styles.empty}>لا توجد صور بعد.</p>
        ) : (
          <div className={styles.grid}>
            {images.map((img) => (
              <a
                key={img.pathname}
                href={img.url}
                target="_blank"
                rel="noreferrer"
                className={styles.thumb}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.url} alt={img.pathname} loading="lazy" />
              </a>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
