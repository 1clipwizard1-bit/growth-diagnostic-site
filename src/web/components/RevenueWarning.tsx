import React from 'react';

interface RevenueWarningProps {
  revenueConfirmed: boolean;
  onRevenueConfirm: (v: boolean) => void;
  enteredRevenue: number;
  impliedRevenue: number;
  errors: any;
}

export default function RevenueWarning({
  revenueConfirmed,
  onRevenueConfirm,
  enteredRevenue,
  impliedRevenue,
  errors,
}: RevenueWarningProps) {
  return (
    <div className="rounded-xl border p-4 mt-2" style={{ borderColor: 'rgba(239,68,68,0.6)', background: 'rgba(239,68,68,0.08)' }}>
      <div className="flex items-start gap-3 mb-3">
        <span style={{ fontSize: '18px', flexShrink: 0 }}>🛑</span>
        <div>
          <div className="text-sm font-bold mb-1" style={{ color: 'var(--red)' }}>Unusual revenue figure</div>
          <div className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>
            You entered <strong style={{ color: 'var(--text)' }}>{`$${enteredRevenue.toLocaleString()}`}</strong>, but{' '}
            <strong style={{ color: 'var(--text)' }}>{`${(impliedRevenue / (parseInt('1') || 1)).toLocaleString()}`}</strong>
            implies <strong style={{ color: 'var(--text)' }}>{`$${impliedRevenue.toLocaleString()}`}</strong> — that's a{' '}
            <strong style={{ color: 'var(--red)' }}>{`${Math.round((1 - enteredRevenue / impliedRevenue) * 100)}%`}</strong> gap.
            This may be a typo (e.g. missing zeros). A wrong figure here will skew your entire audit.
          </div>
        </div>
      </div>
      <input type="checkbox" id="revenue-confirm" checked={revenueConfirmed} onChange={() => onRevenueConfirm(!revenueConfirmed)} className="hidden" />
      <label htmlFor="revenue-confirm" className="flex items-center gap-3 cursor-pointer">
        <div
          className="w-5 h-5 rounded flex items-center justify-center shrink-0 transition-all"
          style={{
            background: revenueConfirmed ? 'var(--orange)' : 'transparent',
            border: `2px solid ${revenueConfirmed ? 'var(--orange)' : errors.totalRevenue === 'confirm_required' ? 'var(--red)' : 'var(--border)'}`,
          }}
        >
          {revenueConfirmed && (
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 5L4.5 7.5L8.5 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
        <span className="text-xs select-none" style={{ color: 'var(--muted)' }}>
          Yes, I confirm — <strong style={{ color: 'var(--text)' }}>{`$${enteredRevenue.toLocaleString()}`}</strong> is my actual revenue for the last 30 days
        </span>
      </label>
      {errors.totalRevenue === 'confirm_required' && !revenueConfirmed && (
        <div className="text-xs mt-2" style={{ color: 'var(--red)' }}>Please confirm this figure to continue</div>
      )}
    </div>
  );
}
