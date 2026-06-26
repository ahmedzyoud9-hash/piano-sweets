"use client";

import { useState } from "react";
import Icon from "./Icon";
import Reveal from "./Reveal";
import styles from "./Enquiry.module.css";

type Errors = { name?: string; phone?: string };

export default function Enquiry() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [values, setValues] = useState({ name: "", phone: "", type: "", note: "" });

  const validate = (v = values): Errors => {
    const e: Errors = {};
    if (!v.name.trim()) e.name = "الرجاء إدخال الاسم.";
    const phone = v.phone.trim();
    if (!phone) e.phone = "الرجاء إدخال رقم الهاتف.";
    else if (!/^[0-9+\s-]{6,}$/.test(phone)) e.phone = "رقم الهاتف غير صحيح.";
    return e;
  };

  const onBlur = (field: string) => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate());
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    setTouched({ name: true, phone: true });
    if (Object.keys(e).length > 0) {
      // focus first invalid (skill §8 focus-management)
      const first = e.name ? "name" : "phone";
      document.getElementById(`f-${first}`)?.focus();
      return;
    }
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 1100); // client-side mock (V1)
  };

  const reset = () => {
    setValues({ name: "", phone: "", type: "", note: "" });
    setErrors({});
    setTouched({});
    setStatus("idle");
  };

  return (
    <section id="enquiry" className={styles.enquiry}>
      <div className="container">
        <div className={styles.card}>
          <div className={styles.aside}>
            <Reveal>
              <p className="eyebrow">تواصل معنا</p>
              <h2 className={styles.title}>
                لنُؤلّف <span className="goldtext">طلبك</span> معًا
              </h2>
              <p className={styles.lead}>
                أخبرنا بما تبحث عنه وسنعود إليك بأناقةٍ وسرعة.
              </p>
            </Reveal>
            <Reveal delay={120} className={styles.contacts}>
              <span className={styles.contact}>
                <Icon name="pin" size={20} className={styles.cIcon} />
                مجمع الغوالي — الكويت
              </span>
              <span className={styles.contact}>
                <Icon name="whatsapp" size={20} className={styles.cIcon} />
                <span dir="ltr">+965 0000 0000</span>
              </span>
            </Reveal>
          </div>

          <div className={styles.formWrap}>
            {status === "sent" ? (
              <div className={styles.success} role="status" aria-live="polite">
                <span className={styles.successIcon}>
                  <Icon name="check" size={34} />
                </span>
                <h3 className={styles.successTitle}>تم استلام طلبك</h3>
                <p className={styles.successText}>
                  شكرًا لك — سيتواصل معك فريق بيانو قريبًا.
                </p>
                <button type="button" className={styles.again} onClick={reset}>
                  إرسال طلب آخر
                </button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={onSubmit} noValidate>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label htmlFor="f-name" className={styles.label}>
                      الاسم <span className={styles.req} aria-hidden="true">*</span>
                    </label>
                    <input
                      id="f-name"
                      className={`${styles.input} ${touched.name && errors.name ? styles.inputErr : ""}`}
                      value={values.name}
                      autoComplete="name"
                      onChange={(e) => setValues({ ...values, name: e.target.value })}
                      onBlur={() => onBlur("name")}
                      aria-invalid={!!(touched.name && errors.name)}
                      aria-describedby={errors.name ? "e-name" : undefined}
                      placeholder="اسمك الكريم"
                    />
                    {touched.name && errors.name && (
                      <span id="e-name" className={styles.err} role="alert">{errors.name}</span>
                    )}
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="f-phone" className={styles.label}>
                      الهاتف <span className={styles.req} aria-hidden="true">*</span>
                    </label>
                    <input
                      id="f-phone"
                      type="tel"
                      dir="ltr"
                      className={`${styles.input} ${styles.ltr} ${touched.phone && errors.phone ? styles.inputErr : ""}`}
                      value={values.phone}
                      autoComplete="tel"
                      inputMode="tel"
                      onChange={(e) => setValues({ ...values, phone: e.target.value })}
                      onBlur={() => onBlur("phone")}
                      aria-invalid={!!(touched.phone && errors.phone)}
                      aria-describedby={errors.phone ? "e-phone" : undefined}
                      placeholder="+965 ..."
                    />
                    {touched.phone && errors.phone && (
                      <span id="e-phone" className={styles.err} role="alert">{errors.phone}</span>
                    )}
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="f-type" className={styles.label}>نوع الطلب</label>
                  <select
                    id="f-type"
                    className={styles.input}
                    value={values.type}
                    onChange={(e) => setValues({ ...values, type: e.target.value })}
                  >
                    <option value="">اختر نوع الطلب</option>
                    <option value="signature">مجموعة التوقيع</option>
                    <option value="gifting">الإهداء الفاخر</option>
                    <option value="corporate">طلب الشركات</option>
                    <option value="custom">طلب مخصّص</option>
                  </select>
                </div>

                <div className={styles.field}>
                  <label htmlFor="f-note" className={styles.label}>تفاصيل إضافية</label>
                  <textarea
                    id="f-note"
                    className={`${styles.input} ${styles.area}`}
                    rows={4}
                    value={values.note}
                    onChange={(e) => setValues({ ...values, note: e.target.value })}
                    placeholder="أخبرنا المزيد عن مناسبتك أو تفضيلاتك…"
                  />
                  <span className={styles.helper}>الحقول المعلَّمة بـ * مطلوبة.</span>
                </div>

                <button
                  type="submit"
                  className={styles.submit}
                  disabled={status === "sending"}
                >
                  {status === "sending" ? (
                    <>
                      <Icon name="spinner" size={20} className={styles.spin} />
                      جارِ الإرسال…
                    </>
                  ) : (
                    <>إرسال الطلب</>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
