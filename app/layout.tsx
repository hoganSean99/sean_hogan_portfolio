import type { Metadata } from "next";
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
        {children}
      </body>
    </html>
  );
}
