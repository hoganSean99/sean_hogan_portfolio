import type { Metadata } from "next";
import Script from "next/script";
import "@fontsource-variable/bricolage-grotesque/standard.css";
import "@fontsource-variable/martian-mono/standard.css";
import "./globals.css";

const description =
  "Seán Hogan is an Oracle Database Administrator in Co. Kerry, Ireland, and the developer of Quotely and Lost Paws on the App Store.";

export const metadata: Metadata = {
  metadataBase: new URL("https://seanhogan.me"),
  title: "Seán Hogan | Oracle Database Administrator",
  description,
  openGraph: {
    title: "Seán Hogan | Oracle Database Administrator",
    description,
    url: "https://seanhogan.me",
    siteName: "Seán Hogan",
    images: [{ url: "/og.jpg", width: 433, height: 433, alt: "Seán Hogan" }],
    locale: "en_IE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IE">
      <body>
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
