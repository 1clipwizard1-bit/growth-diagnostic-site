import React, { useEffect } from "react";
import { Link } from "wouter";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";

export default function PrivacyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "#f5f5f5" }}>
      <Nav />

      {/* Hero */}
      <section
        className="hero-glow"
        style={{ paddingTop: "120px", paddingBottom: "64px" }}
      >
        <div className="max-w-4xl mx-auto px-6">
          <span className="section-label">Legal</span>
          <h1
            className="text-4xl md:text-5xl font-bold mt-4 mb-4"
            style={{
              background: "linear-gradient(135deg, #f5f5f5 0%, #a3a3a3 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Privacy Policy
          </h1>
          <p style={{ color: "#a3a3a3", fontSize: "1rem" }}>
            Last Updated: May 25, 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 pb-24">

        {/* Intro disclaimer banner */}
        <div
          className="rounded-xl p-5 mb-8 text-sm leading-relaxed"
          style={{
            background: "rgba(249,115,22,0.06)",
            border: "1px solid rgba(249,115,22,0.2)",
            color: "#a3a3a3",
          }}
        >
          <span style={{ color: "#f97316", fontWeight: 600 }}>Our Commitment: </span>
          We respect your privacy and are committed to protecting the business and personal data you share with us.
          This Privacy Policy explains how we collect, use, and safeguard your information when you run our AI-powered growth diagnostic.
        </div>

        {/* Sections card */}
        <div
          className="rounded-2xl p-8 md:p-12 space-y-10"
          style={{ background: "#111111", border: "1px solid #1a1a1a" }}
        >

          {/* 1 */}
          <Section title="1. Information We Collect">
            <p>
              To generate your personalized growth audit report, we collect specific information you provide during the questionnaire:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li>
                <Highlight>Business Metrics:</Highlight> Revenue, marketing/ad spend, average order value, conversion rates, sales cycle length, and team structure.
              </li>
              <li>
                <Highlight>Contact Information:</Highlight> Your email address to deliver the report and process payment.
              </li>
              <li>
                <Highlight>Technical Data:</Highlight> IP address, browser type, and analytics cookies to ensure application stability and improve user experience. We use <Highlight>Microsoft Clarity</Highlight> (heatmaps and session recordings) and <Highlight>Google Analytics</Highlight> (traffic and usage analytics) to understand how visitors interact with our site. These services may collect anonymized usage data to help us improve the experience.
              </li>
            </ul>
          </Section>

          <Divider />

          {/* 2 */}
          <Section title="2. How We Use Your Data">
            <p>
              We use your submitted data strictly for the following purposes:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li>To run the calculations and generate your custom diagnostic report.</li>
              <li>To securely deliver the report to your email inbox.</li>
              <li>To handle customer support requests, troubleshoot technical errors, or confirm payments.</li>
            </ul>
            <p className="mt-4">
              We <Highlight>never</Highlight> sell, lease, or distribute your business metrics, conversion data, or email address to third-party advertisers.
            </p>
          </Section>

          <Divider />

          {/* 3 */}
          <Section title="3. Data Retention &amp; Deletion">
            <p>
              We believe in minimal data footprinting. Your business metrics and contact data are retained in our active database for <Highlight>90 days</Highlight> solely for customer support (e.g. to regenerate a lost PDF report).
            </p>
            <p>
              After 90 days, all submitted data is <Highlight>permanently and securely deleted</Highlight> from our systems. You can also request immediate deletion of your data at any time by contacting us.
            </p>
          </Section>

          <Divider />

          {/* 4 */}
          <Section title="4. Payments &amp; Security">
            <p>
              All payments are processed securely through our trusted payment partner. 
              <Highlight> We do not store or process your credit card details on our servers.</Highlight>
            </p>
            <p>
              Our website uses industry-standard SSL (Secure Sockets Layer) encryption to protect all data in transit from your browser to our application.
            </p>
          </Section>

          <Divider />

          {/* 5 */}
          <Section title="5. Third-Party Services">
            <p>
              We rely on trusted third-party providers to help host and run the Service (such as database hosting, secure payment processors, and transactional email systems).
            </p>
            <p>
              These providers only have access to the data necessary to perform their respective technical functions and are contractually bound to maintain strict confidentiality.
            </p>
          </Section>

          <Divider />

          {/* 6 */}
          <Section title="6. Your Rights">
            <p>
              You have the right to access the personal information we hold about you or request that we update or immediately delete it. If you would like to exercise any of these rights, please email us directly.
            </p>
          </Section>

          <Divider />

          {/* 7 */}
          <Section title="7. Contact Us">
            <p>
              If you have any questions about this Privacy Policy or would like to request immediate data deletion, please contact us by filling out our{" "}
              <Link
                href="/contact"
                className="font-semibold transition-colors hover:opacity-80"
                style={{ color: "#f97316", textDecoration: "underline" }}
              >
                contact form
              </Link>
              .
            </p>
          </Section>

        </div>
      </main>

      <Footer />
    </div>
  );
}

/* ─── Sub-components ─── */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4" style={{ color: "#f5f5f5" }}>
        {title}
      </h2>
      <div className="space-y-3 text-sm leading-relaxed" style={{ color: "#a3a3a3" }}>
        {children}
      </div>
    </div>
  );
}

function Divider() {
  return <hr style={{ borderColor: "#1a1a1a" }} />;
}

function Highlight({ children }: { children: React.ReactNode }) {
  return <span style={{ color: "#f97316", fontWeight: 600 }}>{children}</span>;
}
