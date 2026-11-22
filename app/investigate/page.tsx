 "use client";

import { useState } from "react";
import styles from "./investigate.module.css";

const scamTypes = [
  "Romance or dating scam",
  "Impersonation or identity theft",
  "Online shopping or marketplace",
  "Job offer or employment",
  "Phishing or tech support",
  "Investment or financial",
  "Other / not sure",
];

export default function InvestigatePage() {
  const [description, setDescription] = useState("");
  const [scamType, setScamType] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);

  function handleFiles(selected: FileList | null) {
    if (!selected) return;
    setFiles(Array.from(selected).slice(0, 5));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className={styles.page}>
      <nav className={styles.nav}>
        <a className={styles.brand} href="/">
          <span className={styles.brandMark}>⌕</span>
          <span>SCAM <b>DETECTIVE</b></span>
        </a>
        <a className={styles.backLink} href="/">← Back to home</a>
      </nav>

      <section className={styles.wrap}>
        <div className={styles.eyebrow}>PRIVATE INVESTIGATION WORKSPACE</div>
        <h1>Let’s take a closer look.</h1>
        <p className={styles.intro}>
          Tell us what happened. Share the details you have, and we’ll help you
          examine the warning signs and identify what should be verified.
        </p>

        <form className={styles.panel} onSubmit={handleSubmit}>
          <label className={styles.label} htmlFor="scamType">What type of situation are you dealing with?</label>
          <select id="scamType" value={scamType} onChange={(e) => setScamType(e.target.value)} className={styles.select}>
            <option value="">Choose a category</option>
            {scamTypes.map((type) => <option key={type} value={type}>{type}</option>)}
          </select>

          <label className={styles.label} htmlFor="description">Describe what happened</label>
          <p className={styles.hint}>Include relevant messages, requests for money, contact details, websites, and anything that feels unusual. Do not include passwords or full payment-card numbers.</p>
          <textarea
            id="description"
            className={styles.textarea}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="For example: Someone contacted me about an investment opportunity and is asking me to transfer money..."
            rows={7}
            required
          />

          <label className={styles.label} htmlFor="evidence">Add supporting evidence <span className={styles.optional}>Optional</span></label>
          <label className={styles.upload} htmlFor="evidence">
            <span className={styles.uploadIcon}>＋</span>
            <strong>Choose files</strong>
            <span>Images, screenshots, PDFs, or documents</span>
            <small>Up to 5 files in this interface preview</small>
          </label>
          <input id="evidence" className={styles.fileInput} type="file" multiple accept="image/*,.pdf,.txt,.doc,.docx,.eml" onChange={(e) => handleFiles(e.target.files)} />
          {files.length > 0 && (
            <ul className={styles.fileList}>
              {files.map((file, index) => <li key={`${file.name}-${index}`}>{file.name} <span>{Math.ceil(file.size / 1024)} KB</span></li>)}
            </ul>
          )}

          <div className={styles.notice}>
            <span>ⓘ</span>
            <p><b>Privacy note:</b> This is an interface preview. Files are only selected in your browser; no evidence is uploaded or analyzed yet. Avoid sharing highly sensitive information.</p>
          </div>

          <button className={styles.submit} type="submit" disabled={!description.trim()}>
            Review my situation <span>→</span>
          </button>
          {submitted && (
            <div className={styles.previewResult} role="status">
              <b>Your investigation details are ready for the next development stage.</b>
              <p>This preview does not send your information to a server or AI service. We’ll connect secure analysis after the backend and privacy controls are implemented.</p>
            </div>
          )}
        </form>
        <p className={styles.disclaimer}>Scam Detective provides investigative guidance, not a guarantee that an interaction is fraudulent or legitimate.</p>
      </section>
    </main>
  );
}
