import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Seán Hogan - Oracle Database Administrator",
  description: "Portfolio of Seán Hogan, Oracle Database Administrator with 5 years of experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-TM258046TG"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TM258046TG');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
