"use client";

import { useState } from "react";
import Motif from "./Motif";
import Reveal from "./Reveal";
import styles from "./Enquiry.module.css";
import { content, lines } from "./siteContent";

export default function Enquiry() {
  const c = content.enquiry;
  const accessKey = (c as { formAccessKey?: string }).formAccessKey || "";
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // No delivery key configured yet — acknowledge without sending.
    if (!accessKey) {
      setSent(true);
      return;
    }

    const form = e.currentTarget;
    setSending(true);
    try {
      const data = new FormData(form);
      data.append("access_key", accessKey);
      data.append("subject", "طلب جديد من موقع بيانو 🎹");
      data.append("from_name", "Piano Website");
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        setSent(true);
      } else {
        setError("تعذّر إرسال الطلب. حاول مرة أخرى.");
      }
    } catch {
      setError("تعذّر الإرسال — تأكّد من الاتصال وحاول مجدداً.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="enquiry" className={styles.section}>
      <div className={`${styles.inner} formgrid`}>
        <Reveal>
          <span className={styles.eyebrow}>{c.eyebrow}</span>
          <h2 className={styles.title}>{lines(c.title)}</h2>
          <div className={styles.divider} />
          <p className={styles.intro}>{c.intro}</p>
          <div className={styles.contact}>
            <span className={styles.address}>{c.address}</span>
            <span className={styles.phone}>{c.phone}</span>
          </div>
        </Reveal>

        <Reveal>
          {sent ? (
            <div className={styles.thanks}>
              <Motif variant="small" />
              <h3 className={styles.thanksTitle}>شكراً لك</h3>
              <p className={styles.thanksBody}>
                وصلنا طلبك — سيتواصل معك فريق بيانو قريباً لتأليف تجربتك.
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className={styles.resend}
              >
                SEND ANOTHER
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className={styles.form}>
              <div className={`${styles.row} formgrid`}>
                <input
                  required
                  name="الاسم"
                  placeholder="الاسم"
                  className={`${styles.input} pn-input`}
                />
                <input
                  required
                  name="رقم التواصل"
                  placeholder="رقم التواصل"
                  className={`${styles.input} pn-input`}
                />
              </div>
              <input
                required
                type="email"
                name="البريد الإلكتروني"
                placeholder="البريد الإلكتروني"
                className={`${styles.input} pn-input`}
              />
              <select
                name="نوع الطلب"
                className={`${styles.select} pn-input`}
                defaultValue="أفراد"
              >
                <option value="أفراد">نوع الطلب — أفراد</option>
                <option value="إهداء فاخر">إهداء فاخر</option>
                <option value="مناسبة / عُرس">مناسبة / عُرس</option>
                <option value="طلب شركات">طلب شركات</option>
              </select>
              <textarea
                rows={4}
                name="التفاصيل"
                placeholder="تفاصيل طلبك أو مناسبتك"
                className={`${styles.textarea} pn-input`}
              />
              {error && <p className={styles.formError}>{error}</p>}
              <button type="submit" className={styles.submit} disabled={sending}>
                {sending ? "جارٍ الإرسال…" : "SEND ENQUIRY"}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
