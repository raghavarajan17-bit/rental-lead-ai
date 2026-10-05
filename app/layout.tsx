import React from "react";
import Script from "next/script";

export const metadata = {
  title: "Rental-Lead-AI | 24/7 AI Leasing Assistant for Property Managers",
  description: "Automate tenant qualification, answer pricing & pet policies 24/7, and book weekend tours directly into your calendar.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Direct head fallback tag */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-951736182"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-951736182');
            `,
          }}
        />
      </head>
      <body>
        {children}

        {/* Google tag (gtag.js) via Next.js Script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-951736182"
          strategy="afterInteractive"
        />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-951736182');
          `}
        </Script>
      </body>
    </html>
  );
}

