// ─── Analytics Module ─────────────────────────────────────────────────────────
// Central hub for all analytics: Microsoft Clarity + Google Analytics 4.
// Future integrations (e.g. Meta Pixel) can be added here.

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    clarity: (...args: any[]) => void;
  }
}

// ─── GA4 Page View (SPA-aware) ───────────────────────────────────────────────
// In an SPA, GA4 only fires page_view on initial load by default.
// This function manually sends page_view on every route change via wouter.
export function trackPageView(path: string) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_location: window.location.origin + path,
    });
  }
}

// ─── GA4 Custom Event ────────────────────────────────────────────────────────
// Universal event sender. Usage: trackEvent('quiz_step_completed', { step: 2 })
export function trackEvent(eventName: string, params?: Record<string, any>) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
}
