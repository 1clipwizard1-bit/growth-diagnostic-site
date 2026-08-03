import React, { useState, useEffect } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";

// ─── N8N Webhook for Contact Form ─────────────────────────────────────────────
// You can replace this URL with your custom n8n contact webhook url if needed
const N8N_CONTACT_WEBHOOK_URL = 'https://learning11b.app.n8n.cloud/webhook/408fcf55-a336-4f14-8a9e-afeb853aaa1b';

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "", // Honeypot field for anti-spam
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Honeypot anti-spam check:
    // If 'website' has any value, it's a bot submission.
    // We silently simulate success to fool the bot, but NEVER send the request to n8n.
    if (formData.website.trim().length > 0) {
      console.warn("Spam bot detected via honeypot. Ignoring request.");
      setStatus("submitting");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "", website: "" });
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch(N8N_CONTACT_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventType: "contact_submission",
          timestamp: new Date().toISOString(),
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          website: formData.website, // Pass honeypot (always empty for humans)
        }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "", website: "" });
    } catch (err) {
      console.error("Contact submit error:", err);
      setStatus("error");
    }
  };

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "var(--text)" }}>
      <Nav />

      {/* Hero */}
      <section
        className="hero-glow"
        style={{ paddingTop: "120px", paddingBottom: "48px" }}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="section-label">Support</span>
          <h1
            className="text-4xl md:text-5xl font-bold mt-4 mb-4"
            style={{
              background: "linear-gradient(135deg, #f5f5f5 0%, #a3a3a3 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Get in Touch
          </h1>
          <p style={{ color: "var(--muted)", fontSize: "1rem", maxWidth: "500px", margin: "0 auto" }}>
            Have questions about your diagnostic report, billing, or implementation? Drop us a message below.
          </p>
        </div>
      </section>

      {/* Content */}
      <main className="max-w-xl mx-auto px-6 pb-24">
        <div
          className="rounded-2xl p-6 md:p-8 space-y-6"
          style={{
            background: "var(--bg2)",
            border: "1px solid var(--border)",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
          }}
        >
          {status === "success" ? (
            <div className="text-center py-8 space-y-4 animate-fade-up">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
                style={{ background: "rgba(249, 115, 22, 0.1)", border: "1px solid #f97316" }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="text-xl font-bold" style={{ color: "var(--text)" }}>
                Message Sent Successfully!
              </h3>
              <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
                Thank you for reaching out. Our team will get back to you at your provided email address within 24 hours.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="text-sm font-semibold px-6 py-2.5 rounded-lg transition-all mt-4"
                style={{ background: "var(--card)", color: "var(--text)", border: "1px solid var(--border)" }}
                onMouseOver={(e) => (e.currentTarget.style.background = "var(--border)")}
                onMouseOut={(e) => (e.currentTarget.style.background = "var(--card)")}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Honeypot field (hidden from human users, targets automated bots) */}
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                style={{
                  position: "absolute",
                  left: "-9999px",
                  opacity: 0,
                  height: 0,
                  width: 0,
                  zIndex: -1,
                }}
                tabIndex={-1}
                autoComplete="off"
              />

              {status === "error" && (
                <div
                  className="p-4 rounded-xl text-xs"
                  style={{
                    background: "rgba(239, 68, 68, 0.1)",
                    border: "1px solid rgba(239, 68, 68, 0.3)",
                    color: "var(--red)",
                  }}
                >
                  Oops! Something went wrong while sending your message. Please try again.
                </div>
              )}

              {/* Name */}
              <div>
                <label className="block text-xs font-semibold mb-2" style={{ color: "var(--text)" }}>
                  YOUR NAME <span style={{ color: "var(--orange)" }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: "" });
                  }}
                  className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all"
                  style={{
                    background: "var(--bg2)",
                    color: "var(--text)",
                    borderColor: errors.name ? "var(--red)" : formData.name ? "var(--orange)" : "var(--border)",
                    boxShadow: errors.name
                      ? "0 0 0 1px rgba(248,113,113,0.25)"
                      : formData.name
                      ? "0 0 0 1px rgba(249,115,22,0.15)"
                      : "none",
                  }}
                />
                {errors.name && <div className="text-xs mt-1" style={{ color: "var(--red)" }}>{errors.name}</div>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold mb-2" style={{ color: "var(--text)" }}>
                  EMAIL ADDRESS <span style={{ color: "var(--orange)" }}>*</span>
                </label>
                <input
                  type="email"
                  placeholder="e.g. john@company.com"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: "" });
                  }}
                  className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all"
                  style={{
                    background: "var(--bg2)",
                    color: "var(--text)",
                    borderColor: errors.email ? "var(--red)" : formData.email ? "var(--orange)" : "var(--border)",
                    boxShadow: errors.email
                      ? "0 0 0 1px rgba(248,113,113,0.25)"
                      : formData.email
                      ? "0 0 0 1px rgba(249,115,22,0.15)"
                      : "none",
                  }}
                />
                {errors.email && <div className="text-xs mt-1" style={{ color: "var(--red)" }}>{errors.email}</div>}
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs font-semibold mb-2" style={{ color: "var(--text)" }}>
                  SUBJECT <span style={{ color: "var(--orange)" }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Question about the Growth Diagnostic report"
                  value={formData.subject}
                  onChange={(e) => {
                    setFormData({ ...formData, subject: e.target.value });
                    if (errors.subject) setErrors({ ...errors, subject: "" });
                  }}
                  className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all"
                  style={{
                    background: "var(--bg2)",
                    color: "var(--text)",
                    borderColor: errors.subject ? "var(--red)" : formData.subject ? "var(--orange)" : "var(--border)",
                    boxShadow: errors.subject
                      ? "0 0 0 1px rgba(248,113,113,0.25)"
                      : formData.subject
                      ? "0 0 0 1px rgba(249,115,22,0.15)"
                      : "none",
                  }}
                />
                {errors.subject && <div className="text-xs mt-1" style={{ color: "var(--red)" }}>{errors.subject}</div>}
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold mb-2" style={{ color: "var(--text)" }}>
                  MESSAGE <span style={{ color: "var(--orange)" }}>*</span>
                </label>
                <textarea
                  placeholder="Type your message details here..."
                  rows={5}
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (errors.message) setErrors({ ...errors, message: "" });
                  }}
                  className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all resize-none"
                  style={{
                    background: "var(--bg2)",
                    color: "var(--text)",
                    borderColor: errors.message ? "var(--red)" : formData.message ? "var(--orange)" : "var(--border)",
                    boxShadow: errors.message
                      ? "0 0 0 1px rgba(248,113,113,0.25)"
                      : formData.message
                      ? "0 0 0 1px rgba(249,115,22,0.15)"
                      : "none",
                  }}
                />
                {errors.message && <div className="text-xs mt-1" style={{ color: "var(--red)" }}>{errors.message}</div>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full text-sm font-semibold py-3 rounded-xl transition-all mt-2 flex items-center justify-center gap-2"
                style={{
                  background: "var(--orange)",
                  color: "#0a0a0a",
                  opacity: status === "submitting" ? 0.6 : 1,
                  cursor: status === "submitting" ? "not-allowed" : "pointer",
                }}
                onMouseOver={(e) => {
                  if (status !== "submitting") e.currentTarget.style.background = "var(--orange-dark)";
                }}
                onMouseOut={(e) => {
                  if (status !== "submitting") e.currentTarget.style.background = "var(--orange)";
                }}
              >
                {status === "submitting" ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
