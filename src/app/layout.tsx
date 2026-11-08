import type { Metadata, Viewport } from "next";
import "./globals.css";
import { site } from "@/content/site";
import { display, mono, sans } from "@/lib/fonts";
import { Footer } from "@/components/layout/footer";
import { SkipLink } from "@/components/layout/skip-link";
import { StatusBar } from "@/components/layout/status-bar";
import { InlineScript } from "@/components/system/inline-script";
import { introDecisionScript } from "@/components/system/intro";
import { MotionProvider } from "@/components/system/motion-provider";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s — ${site.name}` },
  description: site.description,
  applicationName: site.title,
  keywords: [...site.fields],
  authors: [{ name: site.archivist.handle }],
  openGraph: {
    type: "website",
    siteName: site.title,
    title: site.title,
    description: site.description,
    locale: "en",
  },
  twitter: { card: "summary", title: site.title, description: site.description },
};

export const viewport: Viewport = {
  themeColor: "#08090b",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={site.locale}
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
      // The intro script sets data-intro on <html> before hydration.
      suppressHydrationWarning
    >
      <head>
        <InlineScript html={introDecisionScript} />
      </head>
      <body id="top" className="flex min-h-svh flex-col">
        <SkipLink />
        <MotionProvider>
          <StatusBar />
          <main id="main" tabIndex={-1} className="flex-1 pt-12 focus:outline-none">
            {children}
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
