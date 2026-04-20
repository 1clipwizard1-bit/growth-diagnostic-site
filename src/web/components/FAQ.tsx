import { useState } from 'react';

const faqs = [
  {
    q: 'Who is this for?',
    a: 'This diagnostic is built for small and medium business owners who are actively running paid ads — Google, Meta, or other platforms — and spending at least $3,000/month. If you\'re spending less than that, the unit economics math may not yet be the core issue.',
  },
  {
    q: 'What information do I need to complete the diagnostic?',
    a: 'You\'ll need a general sense of your monthly ad spend, approximate number of leads per month, your average close rate, average deal value, and a rough estimate of your lead response time. Exact numbers aren\'t required — best estimates work fine.',
  },
  {
    q: 'How is this different from a free audit or a quiz?',
    a: 'Most audits give generic advice or a list of "things to improve." This diagnostic runs your actual funnel math, compares it against industry benchmarks, isolates the single most impactful bottleneck, and calculates the monthly revenue cost of that specific gap. It\'s financial analysis, not a checklist.',
  },
  {
    q: 'What format is the report?',
    a: 'Your report is delivered as a structured PDF, formatted for clarity. It includes all 8 diagnostic sections: funnel analysis, unit economics, benchmark comparison, cost of inaction, bottleneck diagnosis, revenue opportunity, suggested next steps, and a 90-day action plan.',
  },
  {
    q: 'How quickly do I receive the report?',
    a: 'The report is generated automatically and delivered instantly upon completion and payment. You\'ll have it in your inbox within minutes of finishing the 12 questions.',
  },
  {
    q: 'Is the $4.99 a subscription?',
    a: 'No. It\'s a one-time payment for your diagnostic report. There are no recurring charges, no upsell traps, and no subscription. You pay once, you get the report.',
  },
  {
    q: 'What happens after I receive the report?',
    a: 'The report includes a clear next-steps recommendation. Depending on what your bottleneck is, there may be an optional follow-on service available (automation setup, funnel optimization, tracking implementation) — but that\'s entirely your choice. The diagnostic stands alone as a complete deliverable.',
  },
  {
    q: 'What if I don\'t run paid ads yet?',
    a: 'The diagnostic is specifically built for businesses actively running paid traffic. If you\'re pre-ads, the unit economics model won\'t have enough data to produce a meaningful bottleneck analysis. We\'d recommend running at least 60 days of ad data before running the diagnostic.',
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 border-t" style={{ borderColor: '#1a1a1a', background: '#0d0d0d' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-16">
          <div>
            <div className="section-label mb-4">FAQ</div>
            <h2 className="font-black tracking-tight mb-4" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: '#f5f5f5' }}>
              Questions
            </h2>
            <p style={{ color: '#a3a3a3' }}>
              Everything you need to know before running your diagnostic.
            </p>
          </div>

          <div className="lg:col-span-2 space-y-2">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl border overflow-hidden"
                style={{ borderColor: open === i ? 'rgba(249,115,22,0.3)' : '#2a2a2a', background: open === i ? 'rgba(249,115,22,0.04)' : '#111' }}
              >
                <button
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span className="font-semibold text-sm" style={{ color: '#f5f5f5' }}>{faq.q}</span>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform" style={{ background: '#1c1c1c', transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 2V10M2 6H10" stroke="#a3a3a3" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                </button>
                {open === i && (
                  <div className="px-6 pb-5 text-sm leading-relaxed" style={{ color: '#a3a3a3' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
