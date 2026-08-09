"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import styles from "./admin.module.css";
import defaultContent from "@/content/site.json";

type UploadedImage = { url: string; pathname: string };
type ImgRec = { w: number; h: number };
type Field = {
  key: string;
  label: string;
  type: "text" | "textarea" | "image" | "media";
  rec?: ImgRec;
  recMobile?: ImgRec;
};
type ArrayDef = {
  key: string;
  label: string;
  itemLabel: string;
  fields: Field[];
};
type Section = {
  key: string;
  title: string;
  note?: string;
  fields?: Field[];
  arrays?: ArrayDef[];
};

// Describes every editable field on the site so the editor can render itself.
const SCHEMA: Section[] = [
  {
    key: "hero",
    title: "الغلاف (Hero)",
    fields: [
      { key: "logo", label: "شعار الغلاف", type: "image", rec: { w: 880, h: 880 }, recMobile: { w: 600, h: 600 } },
      { key: "taglineEn", label: "السطر بالإنجليزي", type: "text" },
      { key: "taglineAr", label: "السطر بالعربي", type: "text" },
      { key: "intro", label: "النص التعريفي", type: "textarea" },
      { key: "cta", label: "نص زر الاكتشاف", type: "text" },
      { key: "ctaLink", label: "رابط زر الاكتشاف (فارغ = ينزل لقسم القصة)", type: "text" },
    ],
  },
  {
    key: "story",
    title: "قصة العلامة (Story)",
    fields: [
      { key: "eyebrow", label: "العنوان الصغير (EN)", type: "text" },
      { key: "title", label: "العنوان", type: "text" },
      { key: "body", label: "النص", type: "textarea" },
      { key: "quote", label: "الاقتباس", type: "textarea" },
    ],
  },
  {
    key: "philosophy",
    title: "الفلسفة (Philosophy)",
    fields: [
      { key: "eyebrow", label: "العنوان الصغير (EN)", type: "text" },
      { key: "title", label: "العنوان", type: "text" },
      { key: "subtitle", label: "العنوان الفرعي", type: "text" },
    ],
    arrays: [
      {
        key: "values",
        label: "القيم",
        itemLabel: "قيمة",
        fields: [
          { key: "ar", label: "بالعربي", type: "text" },
          { key: "en", label: "بالإنجليزي", type: "text" },
          { key: "desc", label: "الوصف", type: "textarea" },
        ],
      },
    ],
  },
  {
    key: "founder",
    title: "المؤسّس (Founder)",
    fields: [
      { key: "media", label: "وسائط المؤسّس (صورة أو فيديو)", type: "media", rec: { w: 1080, h: 1350 }, recMobile: { w: 800, h: 1000 } },
      { key: "eyebrow", label: "العنوان الصغير (EN)", type: "text" },
      { key: "title", label: "العنوان (سطر جديد بزر Enter)", type: "textarea" },
      { key: "body1", label: "الفقرة الأولى", type: "textarea" },
      { key: "body2", label: "الفقرة الثانية", type: "textarea" },
    ],
  },
  {
    key: "collections",
    title: "المجموعات (Collections)",
    fields: [
      { key: "eyebrow", label: "العنوان الصغير (EN)", type: "text" },
      { key: "title", label: "العنوان", type: "text" },
      { key: "tagline", label: "السطر التعريفي", type: "text" },
    ],
    arrays: [
      {
        key: "items",
        label: "المجموعات",
        itemLabel: "مجموعة",
        fields: [
          { key: "num", label: "الرقم الروماني", type: "text" },
          { key: "ar", label: "الاسم بالعربي", type: "text" },
          { key: "en", label: "الاسم بالإنجليزي", type: "text" },
          { key: "desc", label: "الوصف", type: "textarea" },
          { key: "image", label: "الصورة", type: "image", rec: { w: 900, h: 1125 }, recMobile: { w: 720, h: 900 } },
        ],
      },
    ],
  },
  {
    key: "gallery",
    title: "المعرض (Gallery)",
    note: "صور المعرض تُدار من قسم «صور المعرض» أسفل الصفحة.",
    fields: [
      { key: "eyebrow", label: "العنوان الصغير (EN)", type: "text" },
      { key: "title", label: "العنوان", type: "text" },
      { key: "tagline", label: "السطر التعريفي", type: "text" },
    ],
  },
  {
    key: "occasions",
    title: "المناسبات (Occasions)",
    fields: [
      { key: "eyebrow", label: "العنوان الصغير (EN)", type: "text" },
      { key: "title", label: "العنوان", type: "text" },
      { key: "subtitle", label: "العنوان الفرعي", type: "text" },
    ],
    arrays: [
      {
        key: "items",
        label: "البطاقات",
        itemLabel: "بطاقة",
        fields: [
          { key: "ar", label: "بالعربي", type: "text" },
          { key: "en", label: "بالإنجليزي", type: "text" },
          { key: "desc", label: "الوصف", type: "textarea" },
          { key: "link", label: "الرابط عند الضغط (اختياري)", type: "text" },
        ],
      },
    ],
  },
  {
    key: "enquiry",
    title: "الطلبات (Enquiry)",
    fields: [
      { key: "eyebrow", label: "العنوان الصغير (EN)", type: "text" },
      { key: "title", label: "العنوان (سطر جديد بزر Enter)", type: "textarea" },
      { key: "intro", label: "النص التعريفي", type: "textarea" },
      { key: "address", label: "العنوان / الموقع", type: "text" },
      { key: "phone", label: "رقم الهاتف", type: "text" },
    ],
  },
  {
    key: "quoteBanner",
    title: "شريط الاقتباس (Quote)",
    fields: [
      { key: "quote", label: "الاقتباس (EN)", type: "text" },
      { key: "translation", label: "الترجمة (AR)", type: "text" },
    ],
  },
  {
    key: "footer",
    title: "التذييل (Footer)",
    fields: [
      { key: "blurb", label: "نبذة", type: "textarea" },
      { key: "visitTitle", label: "عنوان «زورونا» (EN)", type: "text" },
      { key: "visitAr", label: "الموقع بالعربي", type: "text" },
      { key: "visitEn", label: "الموقع بالإنجليزي", type: "text" },
      { key: "connectTitle", label: "عنوان «تواصل» (EN)", type: "text" },
      { key: "social.instagram", label: "رابط إنستقرام", type: "text" },
      { key: "social.whatsapp", label: "واتساب (رقم مثل 96500000000 أو رابط)", type: "text" },
      { key: "social.phone", label: "رقم الاتصال (مثل +96500000000)", type: "text" },
      { key: "copyright", label: "حقوق النشر", type: "text" },
      { key: "tagline", label: "الشعار الختامي", type: "text" },
    ],
  },
];

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

function setDeep(obj: any, path: (string | number)[], value: any): any {
  const next = structuredClone(obj);
  let cur = next;
  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i];
    if (cur[key] == null || typeof cur[key] !== "object") {
      // Create the missing container (array if the next key is an index).
      cur[key] = typeof path[i + 1] === "number" ? [] : {};
    }
    cur = cur[key];
  }
  cur[path[path.length - 1]] = value;
  return next;
}

function getDeep(obj: any, path: (string | number)[]): any {
  let cur = obj;
  for (const key of path) {
    if (cur == null) return undefined;
    cur = cur[key];
  }
  return cur;
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(false);
  const [authError, setAuthError] = useState("");

  const [content, setContent] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const [saveErr, setSaveErr] = useState("");
  const [busySlot, setBusySlot] = useState("");

  // Gallery uploads (dynamic image list).
  const [uploading, setUploading] = useState(false);
  const [galMsg, setGalMsg] = useState("");
  const [galErr, setGalErr] = useState("");
  const [images, setImages] = useState<UploadedImage[]>([]);

  const loadContent = useCallback(async () => {
    try {
      const res = await fetch("/api/content", { cache: "no-store" });
      const data = await res.json();
      setContent(data.content ?? structuredClone(defaultContent));
    } catch {
      setContent(structuredClone(defaultContent));
    }
  }, []);

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
    if (!authed) return;
    void (async () => {
      await loadContent();
      await loadImages();
    })();
  }, [authed, loadContent, loadImages]);

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
      if (data.ok) setAuthed(true);
      else setAuthError(data.error || "كلمة السر غير صحيحة.");
    } catch {
      setAuthError("تعذّر التحقق. حاول مرة أخرى.");
    } finally {
      setChecking(false);
    }
  }

  const update = (path: (string | number)[], value: any) =>
    setContent((prev: any) => setDeep(prev, path, value));

  async function uploadTo(path: (string | number)[], file: File) {
    const slotKey = path.join(".");
    setBusySlot(slotKey);
    setSaveErr("");
    try {
      const resized = await resizeImage(file);
      const body = new FormData();
      body.append("password", password);
      body.append("file", resized);
      const res = await fetch("/api/upload", { method: "POST", body });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `فشل الرفع (${res.status}).`);
      }
      const data = await res.json();
      if (data.url) update(path, data.url);
    } catch (err) {
      setSaveErr((err as Error).message || "فشل رفع الصورة.");
    } finally {
      setBusySlot("");
    }
  }

  async function handleSave() {
    setSaving(true);
    setSaveMsg("");
    setSaveErr("");
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, content }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "فشل الحفظ.");
      setSaveMsg("تم الحفظ ✓ ستظهر التعديلات على الموقع خلال دقيقة تقريباً بعد إعادة النشر.");
    } catch (err) {
      setSaveErr((err as Error).message || "فشل الحفظ.");
    } finally {
      setSaving(false);
    }
  }

  async function handleGalleryFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    setUploading(true);
    setGalMsg("");
    setGalErr("");
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
        setGalMsg(`تم رفع ${done} من ${files.length}…`);
      }
      setGalMsg(`تم رفع ${done} ${done === 1 ? "صورة" : "صور"} بنجاح ✓`);
      await loadImages();
    } catch (err) {
      setGalErr((err as Error).message || "فشل الرفع.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  function ImageSlot({ path, field }: { path: (string | number)[]; field: Field }) {
    const value = getDeep(content, path) ?? { web: "", mobile: "" };
    const variants: { key: "web" | "mobile"; label: string; rec?: ImgRec }[] = [
      { key: "web", label: "الويب (كمبيوتر)", rec: field.rec },
      { key: "mobile", label: "الموبايل (اختياري)", rec: field.recMobile },
    ];
    return (
      <div className={styles.imageSlot}>
        {variants.map((v) => {
          const slotKey = [...path, v.key].join(".");
          const url = value?.[v.key] as string | undefined;
          return (
            <div key={v.key} className={styles.variant}>
              <div className={styles.variantHead}>
                <span className={styles.variantLabel}>{v.label}</span>
                {v.rec && (
                  <span className={styles.recSize}>
                    المقاس المفضّل: {v.rec.w} × {v.rec.h} بكسل
                  </span>
                )}
              </div>
              <div className={styles.variantBody}>
                <div className={styles.preview}>
                  {url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={url} alt={v.label} />
                  ) : (
                    <span className={styles.previewEmpty}>لا صورة</span>
                  )}
                </div>
                <div className={styles.variantActions}>
                  <label className={styles.uploadBtn}>
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      disabled={busySlot === slotKey}
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) uploadTo([...path, v.key], f);
                        e.target.value = "";
                      }}
                    />
                    {busySlot === slotKey
                      ? "جارٍ الرفع…"
                      : url
                      ? "استبدال الصورة"
                      : "رفع صورة"}
                  </label>
                  {url && v.key === "mobile" && (
                    <button
                      type="button"
                      className={styles.clearBtn}
                      onClick={() => update([...path, v.key], "")}
                    >
                      إزالة
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  function VideoSlot({ path }: { path: (string | number)[] }) {
    const url = (getDeep(content, path) as string) ?? "";
    const slotKey = path.join(".");
    return (
      <div className={styles.variant}>
        <div className={styles.variantHead}>
          <span className={styles.variantLabel}>ملف الفيديو</span>
          <span className={styles.recSize}>
            MP4 عمودي (نسبة 4:5) — مقطع قصير ومضغوط، حتى 4MB تقريباً
          </span>
        </div>
        <div className={styles.variantBody}>
          <div className={styles.preview}>
            {url ? (
              <video src={url} muted playsInline />
            ) : (
              <span className={styles.previewEmpty}>لا فيديو</span>
            )}
          </div>
          <div className={styles.variantActions}>
            <label className={styles.uploadBtn}>
              <input
                type="file"
                accept="video/*"
                hidden
                disabled={busySlot === slotKey}
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) uploadTo(path, f);
                  e.target.value = "";
                }}
              />
              {busySlot === slotKey
                ? "جارٍ الرفع…"
                : url
                ? "استبدال الفيديو"
                : "رفع فيديو"}
            </label>
            {url && (
              <button
                type="button"
                className={styles.clearBtn}
                onClick={() => update(path, "")}
              >
                إزالة
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  function renderField(field: Field, path: (string | number)[]) {
    if (field.type === "media") {
      const mediaType = (getDeep(content, [...path, "type"]) as string) ?? "image";
      return (
        <div key={path.join(".")} className={styles.field}>
          <label className={styles.fieldLabel}>{field.label}</label>
          <div className={styles.mediaToggle}>
            {(["image", "video"] as const).map((t) => (
              <button
                key={t}
                type="button"
                className={`${styles.toggleBtn}${
                  mediaType === t ? ` ${styles.toggleBtnActive}` : ""
                }`}
                onClick={() => update([...path, "type"], t)}
              >
                {t === "image" ? "صورة" : "فيديو"}
              </button>
            ))}
          </div>
          {mediaType === "video" ? (
            <VideoSlot path={[...path, "video"]} />
          ) : (
            <ImageSlot path={[...path, "image"]} field={field} />
          )}
        </div>
      );
    }
    if (field.type === "image") {
      return (
        <div key={path.join(".")} className={styles.field}>
          <label className={styles.fieldLabel}>{field.label}</label>
          <ImageSlot path={path} field={field} />
        </div>
      );
    }
    const value = (getDeep(content, path) as string) ?? "";
    return (
      <div key={path.join(".")} className={styles.field}>
        <label className={styles.fieldLabel}>{field.label}</label>
        {field.type === "textarea" ? (
          <textarea
            className={styles.textInput}
            rows={3}
            value={value}
            onChange={(e) => update(path, e.target.value)}
          />
        ) : (
          <input
            className={styles.textInput}
            value={value}
            onChange={(e) => update(path, e.target.value)}
          />
        )}
      </div>
    );
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
            <h1 className={styles.title}>إدارة محتوى الموقع</h1>
          </div>
          <Link href="/" className={styles.back}>
            ← العودة للموقع
          </Link>
        </header>

        {!content ? (
          <p className={styles.empty}>جارٍ تحميل المحتوى…</p>
        ) : (
          <>
            {SCHEMA.map((section) => (
              <section key={section.key} className={styles.block}>
                <h2 className={styles.subhead}>{section.title}</h2>
                {section.note && <p className={styles.blockNote}>{section.note}</p>}
                {section.fields?.map((f) =>
                  renderField(f, [section.key, ...f.key.split(".")])
                )}
                {section.arrays?.map((arr) => (
                  <div key={arr.key} className={styles.arrayBlock}>
                    <h3 className={styles.arrayTitle}>{arr.label}</h3>
                    {(getDeep(content, [section.key, arr.key]) as any[])?.map(
                      (_item, idx) => (
                        <div key={idx} className={styles.arrayItem}>
                          <span className={styles.arrayItemLabel}>
                            {arr.itemLabel} {idx + 1}
                          </span>
                          {arr.fields.map((f) =>
                            renderField(f, [section.key, arr.key, idx, f.key])
                          )}
                        </div>
                      )
                    )}
                  </div>
                ))}
              </section>
            ))}

            {/* Gallery uploads — dynamic image list */}
            <section className={styles.block}>
              <h2 className={styles.subhead}>صور المعرض (Gallery)</h2>
              <p className={styles.blockNote}>
                كل صورة ترفعها هنا تظهر تلقائياً في قسم المعرض. المقاس المفضّل: 1200 × 1500 بكسل.
              </p>
              <label className={styles.dropzone}>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleGalleryFiles}
                  disabled={uploading}
                  hidden
                />
                <span className={styles.dropIcon}>＋</span>
                <span className={styles.dropText}>
                  {uploading ? "جارٍ الرفع…" : "اضغط لاختيار صور للمعرض"}
                </span>
                <span className={styles.dropSub}>JPG · PNG · WEBP — حتى 15MB للصورة</span>
              </label>
              {galMsg && <p className={styles.success}>{galMsg}</p>}
              {galErr && <p className={styles.error}>{galErr}</p>}
              {images.length > 0 && (
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
            </section>
          </>
        )}
      </div>

      {/* Sticky save bar */}
      {content && (
        <div className={styles.saveBar}>
          <div className={styles.saveBarInner}>
            <div className={styles.saveStatus}>
              {saveMsg && <span className={styles.success}>{saveMsg}</span>}
              {saveErr && <span className={styles.error}>{saveErr}</span>}
            </div>
            <button
              className={styles.saveButton}
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "جارٍ الحفظ…" : "حفظ التعديلات"}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
