"use client";

import React, { useEffect } from "react";
import Script from "next/script";

export default function ConfirmationPage() {
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "conversion", {
        send_to: "AW-951736182/EdR8CNr6_JEdEPau6oUD",
      });
    }
  }, []);

  return (
    <div className="bg-[#0b0f19] text-slate-100 min-h-screen flex items-center justify-center p-4">
      {/* Event snippet for Rental Lead Generated conversion page */}
      <Script id="google-ads-conversion" strategy="afterInteractive">
        {`
          gtag('event', 'conversion', {'send_to': 'AW-951736182/EdR8CNr6_JEdEPau6oUD'});
        `}
      </Script>

      <div className="max-w-md w-full bg-[#131b2e] border border-slate-800 rounded-3xl p-8 text-center shadow-2xl">
        <div className="w-16 h-16 mx-auto mb-6 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl flex items-center justify-center text-emerald-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 mb-3">
          Rental Lead Generated • Tracking Active
        </span>
        <h1 className="text-2xl font-bold text-white mb-2">Thank You! Lead Confirmed</h1>
        <p className="text-sm text-slate-400 leading-relaxed mb-6">
          Your tenant qualification & tour inquiry has been successfully captured and recorded.
        </p>
        <div className="space-y-3">
          <a href="/" className="block w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm transition">
            Return to Leasing Portal
          </a>
        </div>
      </div>
    </div>
  );
}
