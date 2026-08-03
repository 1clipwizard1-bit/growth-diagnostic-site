import { useState } from 'react';

const faqs = [
  {
    q: 'Can 18 questions really find my bottleneck?',
    a: '18 questions can\'t tell us everything about your business. But they can tell us where your numbers break against benchmarks — and in funnel math, the biggest break IS the bottleneck. The report shows the calculation behind the diagnosis, so you can check the logic yourself.',
  },
  {
    q: 'What if the problem isn\'t marketing?',
    a: 'Then that\'s the answer you get. About a third of bottlenecks sit outside ad accounts — in response time, follow-up, pricing, or capacity. If your marketing is fine, the report says so and shows what\'s actually leaking.',
  },
  {
    q: 'My business is seasonal. Can this even measure my marketing correctly?',
    a: 'Seasonality is exactly why most owners misread their numbers. The diagnostic separates your funnel economics from demand cycles — so you can see whether ads drive revenue or just ride the season.',
  },
  {
    q: 'I\'ve run this business for 10+ years. What can this tell me that I don\'t know?',
    a: 'Nothing about your business, but something about your numbers. Most owners have never seen their cost-per-close or in-season vs. off-season cost-per-lead side by side against benchmarks. This doesn\'t question your experience — it runs a calculation you\'ve never had a reason to run.',
  },
  {
    q: 'What if my agency is already doing everything right?',
    a: 'Then the report confirms it — with numbers you can show them. And if something\'s off, you\'ll know exactly what to ask about at the next meeting. Either way, you stop taking "it\'s performing well" on faith.',
  },
  {
    q: 'I don\'t know some of my numbers. Can I still complete it?',
    a: 'Yes. Ranges and best estimates work — the math flags where precision matters and where it doesn\'t. Not knowing your numbers is itself a data point: it usually means tracking is one of the gaps.',
  },
  {
    q: 'I\'ve been burned by agencies and lead platforms before. How is this different?',
    a: 'It\'s $4.99, not a retainer. It\'s a report, not a pitch — no sales call unless you ask for one. And every number in it shows its math, so you verify the logic yourself. If it doesn\'t identify a quantified bottleneck, you get a refund.',
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
              Before You Decide
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
