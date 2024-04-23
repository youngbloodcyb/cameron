import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Main } from "@/components/craft";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "cameron.so",
  description: "All the things I make.",
  metadataBase: new URL("https://cameron.so"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        <meta property="og:image" content="<generated>" />
        <meta property="og:image:type" content="<generated>" />
        <meta property="og:image:width" content="<generated>" />
        <meta property="og:image:height" content="<generated>" />
      </head>
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <Main className="flex flex-col">{children}</Main>
          <p className="hidden md:block fixed bottom-4 right-4 text-xs">
            © Cameron Youngblood, All rights reserved.
          </p>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
