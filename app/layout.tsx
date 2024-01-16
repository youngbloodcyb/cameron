import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "cameron.so",
  description: "All the things I make.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta property="og:image" content="<generated>" />
        <meta property="og:image:type" content="<generated>" />
        <meta property="og:image:width" content="<generated>" />
        <meta property="og:image:height" content="<generated>" />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <p className="hidden md:block text-slate-300 fixed bottom-4 right-4">
            © Cameron Youngblood, All rights reserved.
          </p>
          <p className="hidden md:block text-slate-300 fixed bottom-4 left-4">
            contact me through twitter
          </p>
        </ThemeProvider>
      </body>
    </html>
  );
}
