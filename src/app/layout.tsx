import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Neuro Nostalgia - Web Time Machine",
  description: "Transform modern websites into authentic 90s style!",
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-ms-sans">{children}</body>
    </html>
  );
}
