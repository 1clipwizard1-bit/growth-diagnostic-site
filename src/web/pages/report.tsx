import { useState, useEffect } from "react";
import { useParams, Link } from "wouter";
import { trackEvent } from "../lib/analytics";

export default function ReportPage() {
  const { token } = useParams<{ token: string }>();
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    trackEvent('report_viewed', { token });
    let startTime = Date.now();

    const sendTimeData = () => {
      const endTime = Date.now();
      const sessionSeconds = Math.round((endTime - startTime) / 1000);
      
      if (sessionSeconds > 0 && token) {
        const url = `/api/track-time?token=${token}&seconds=${sessionSeconds}`;
        // Use sendBeacon for reliable analytics transmission on page close/unload
        navigator.sendBeacon(url);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        sendTimeData();
      } else {
        startTime = Date.now(); // reset timer start when tab gains focus
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', sendTimeData);

    return () => {
      sendTimeData();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', sendTimeData);
    };
  }, [token]);

  const handleDownloadPDF = async () => {
    setDownloading(true);
    try {
      const response = await fetch(`/api/pdf?token=${token}`);
      if (!response.ok) {
        let errorDetails = "";
        try {
          const errJson = await response.json();
          errorDetails = errJson.error || errJson.details || "";
        } catch {}
        throw new Error(errorDetails || `Server error: ${response.status}`);
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `report-${token}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      trackEvent('pdf_downloaded', { token });
    } catch (err: any) {
      console.error(err);
      alert(`Failed to download PDF: ${err.message || "Please try again later."}`);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* Header */}
      <header className="border-b" style={{ background: "rgba(10,10,10,0.95)", borderColor: "var(--border)" }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded flex items-center justify-center" style={{ background: "var(--orange)" }}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M8 2L14 6V10L8 14L2 10V6L8 2Z" fill="white" fillOpacity="0.9" />
                <path d="M8 5L11 7V9L8 11L5 9V7L8 5Z" fill="white" />
              </svg>
            </div>
            <span className="font-bold text-sm tracking-tight text-neutral-100">GrowthDiagnostic</span>
          </Link>

          <button
            onClick={handleDownloadPDF}
            disabled={downloading}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all disabled:opacity-50"
            style={{ background: "var(--orange)", color: "#0a0a0a" }}
            onMouseOver={e => (e.currentTarget.style.background = "var(--orange-dark)")}
            onMouseOut={e => (e.currentTarget.style.background = "var(--orange)")}
          >
            {downloading ? (
              <>
                <svg className="animate-spin h-3.5 w-3.5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Generating PDF...
              </>
            ) : (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download PDF
              </>
            )}
          </button>
        </div>
      </header>

      {/* Report Iframe */}
      <main className="flex-1 bg-[#e8eaf0]">
        <iframe
          src={`/api/report?token=${token}&html=true`}
          title="Growth Diagnostic Report"
          className="w-full h-full border-none"
        />
      </main>
    </div>
  );
}
