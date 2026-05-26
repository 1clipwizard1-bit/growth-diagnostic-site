import React, { useEffect } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";

export default function TermsPage() {
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
            Terms &amp; Conditions
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
          <span style={{ color: "#f97316", fontWeight: 600 }}>Important: </span>
          By purchasing or using our AI-powered diagnostic service ("Service"), you agree to the
          following Terms &amp; Conditions. I understand this report is automatically generated
          based on the information provided and is intended as a business insight tool, not
          professional financial or financial advisory services.
        </div>

        {/* Sections card */}
        <div
          className="rounded-2xl p-8 md:p-12 space-y-10"
          style={{ background: "#111111", border: "1px solid #1a1a1a" }}
        >

          {/* 1 */}
          <Section title="1. Service Overview">
            <p>
              This Service provides an automated AI-powered diagnostic report that analyzes your
              business metrics to identify potential growth bottlenecks, inefficiencies, and revenue
              opportunities.
            </p>
            <p>
              The report is generated automatically based on the information you provide. Results
              depend on the accuracy and completeness of your submitted data.
            </p>
          </Section>

          <Divider />

          {/* 2 */}
          <Section title="2. Estimated Outcomes">
            <p>
              The report may include estimated revenue impact, efficiency improvements, or opportunity
              costs. These are modeled projections based on benchmark data and automated analysis.
            </p>
            <p>
              Actual business results depend on implementation quality, market conditions, and
              execution. This report identifies the opportunity — implementation determines the outcome.
            </p>
            <p>
              For hands-on implementation support, book a strategy call:{" "}
              <span style={{ color: "#f97316" }}>[Calendar Link]</span>
            </p>
          </Section>

          <Divider />

          {/* 3 */}
          <Section title="3. Digital Product &amp; Refunds">
            <p>
              The report is a digital product delivered electronically. Due to its automated nature,{" "}
              <Highlight>all sales are final</Highlight> once the report has been generated and
              delivered.
            </p>
            <p>
              If you experience a technical issue preventing delivery, contact us at{" "}
              <span style={{ color: "#f97316" }}>[your-email]</span> and we will resolve it.
            </p>
          </Section>

          <Divider />

          {/* 4 */}
          <Section title="4. Limitation of Liability">
            <p>
              To the maximum extent permitted by law, our total liability shall not exceed the amount
              you paid for the Service (<Highlight>$4.99</Highlight>).
            </p>
          </Section>

          <Divider />

          {/* 5 */}
          <Section title="5. Privacy">
            <p>
              Information submitted (revenue, ad spend, conversion data) is used solely to generate
              your report and improve our service. We do not sell or publicly share your business data.
            </p>
            <p>
              Submitted data is retained for <Highlight>90 days</Highlight> for support purposes,
              then permanently deleted.
            </p>
          </Section>

          <Divider />

          {/* 6 */}
          <Section title="6. Intellectual Property">
            <p>
              All platform content, report structures, and branding remain our property. Reports are
              for your personal or internal business use only and may not be resold or redistributed.
            </p>
          </Section>

          <Divider />

          {/* 7 */}
          <Section title="7. Contact">
            <p>For questions:</p>
            <div
              className="mt-4 p-4 rounded-xl"
              style={{ background: "#0a0a0a", border: "1px solid #2a2a2a" }}
            >
              <p style={{ color: "#a3a3a3" }}>
                Email: <span style={{ color: "#f97316" }}>[your-email]</span>
              </p>
            </div>
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
