"use client";

import { useState } from "react";
import Motif from "./Motif";
import Reveal from "./Reveal";
import styles from "./Enquiry.module.css";

export default function Enquiry() {
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="enquiry" className={styles.section}>
      <div className={`${styles.inner} formgrid`}>
        <Reveal>
          <span className={styles.eyebrow}>ENQUIRIES &amp; ORDERS</span>
          <h2 className={styles.title}>
            اطلب
            <br />
            تجربتك الخاصة
          </h2>
          <div className={styles.divider} />
          <p className={styles.intro}>
            لطلبات الأفراد، الإهداء، أو المناسبات والشركات — اترك تفاصيلك
            وسيتواصل معك فريق بيانو لتأليف تجربةٍ تليق باللحظة.
          </p>
          <div className={styles.contact}>
            <span className={styles.address}>مجمع الغوالي — الكويت</span>
            <span className={styles.phone}>+965 0000 0000</span>
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
                  placeholder="الاسم"
                  className={`${styles.input} pn-input`}
                />
                <input
                  required
                  placeholder="رقم التواصل"
                  className={`${styles.input} pn-input`}
                />
              </div>
              <select className={`${styles.select} pn-input`} defaultValue="أفراد">
                <option value="أفراد">نوع الطلب — أفراد</option>
                <option value="إهداء فاخر">إهداء فاخر</option>
                <option value="مناسبة / عُرس">مناسبة / عُرس</option>
                <option value="طلب شركات">طلب شركات</option>
              </select>
              <textarea
                rows={4}
                placeholder="تفاصيل طلبك أو مناسبتك"
                className={`${styles.textarea} pn-input`}
              />
              <button type="submit" className={styles.submit}>
                SEND ENQUIRY
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
