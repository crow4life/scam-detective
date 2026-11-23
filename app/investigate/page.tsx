"use client";

import { useState } from "react";
import styles from "./investigate.module.css";

const scamTypes = [
  { label: "Romance or dating scam", value: "romance" },
  { label: "Impersonation or identity theft", value: "impersonation" },
  { label: "Online shopping or marketplace", value: "marketplace" },
  { label: "Job offer or employment", value: "job" },
  { label: "Phishing or tech support", value: "phishing" },
  { label: "Investment or financial", value: "investment" },
  { label: "Other / not sure", value: "other" },
];

export default function InvestigatePage() {
  const [description, setDescription] = useState("");
  const [scamType, setScamType] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function handleFiles(selected: FileList | null) {
    if (!selected) return;
    setFiles(Array.from(selected).slice(0, 5));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(false);
    setError("");

    if (!scamType) {
      setError("Please choose a situation category.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/investigations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: scamType,
          description: description.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "We couldn't submit your investigation details. Please try again.");
      }

      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
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
          <select
            id="scamType"
            value={scamType}
            onChange={(e) => setScamType(e.target.value)}
            className={styles.select}
            required
          >
            <option value="">Choose a category</option>
            {scamTypes.map((type) => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
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
            maxLength={5000}
            required
          />

          <label className={styles.label} htmlFor="evidence">Add supporting evidence <span className={styles.optional}>Optional</span></label>
          <label className={styles.upload} htmlFor="evidence">
            <span className={styles.uploadIcon}>＋</span>
            <strong>Choose files</strong>
            <span>Images, screenshots, PDFs, or documents</span>
            <small>Up to 5 files can be selected. Upload and analysis are not connected yet.</small>
          </label>
          <input
            id="evidence"
            className={styles.fileInput}
            type="file"
            multiple
            accept="image/*,.pdf,.txt,.doc,.docx,.eml"
            onChange={(e) => handleFiles(e.target.files)}
          />
          {files.length > 0 && (
            <ul className={styles.fileList}>
              {files.map((file, index) => (
                <li key={`${file.name}-${index}`}>
                  {file.name} <span>{Math.ceil(file.size / 1024)} KB</span>
                </li>
              ))}
            </ul>
          )}

          <div className={styles.notice}>
            <span>ⓘ</span>
            <p><b>Privacy note:</b> Your category and description will be sent to the Scam Detective backend for basic validation. Selected evidence files remain in your browser and are not uploaded or analyzed yet. Avoid sharing highly sensitive information.</p>
          </div>

          <button className={styles.submit} type="submit" disabled={!description.trim() || !scamType || submitting}>
            {submitting ? "Submitting..." : "Review my situation"} <span>→</span>
          </button>

          {error && (
            <div className={styles.previewResult} role="alert">
              <b>We couldn't submit your details.</b>
              <p>{error}</p>
            </div>
          )}

          {submitted && (
            <div className={styles.previewResult} role="status">
              <b>Your details were received by the Scam Detective backend.</b>
              <p>The category and description passed basic server-side validation. AI investigation and evidence-file upload are not connected yet, so your case has not been analyzed.</p>
            </div>
          )}
        </form>
        <p className={styles.disclaimer}>Scam Detective provides investigative guidance, not a guarantee that an interaction is fraudulent or legitimate.</p>
      </section>
    </main>
  );
}
