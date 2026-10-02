import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { portfolio } from "@/lib/data";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const { site, personal } = portfolio;
// Set the deployed URL in portfolio.json (site.url) or NEXT_PUBLIC_SITE_URL so social previews resolve.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || site.url;

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: site.title,
  description: site.description,
  keywords: site.keywords,
  authors: [{ name: personal.name }],
  openGraph: {
    type: "profile",
    title: site.title,
    description: site.description,
    siteName: site.shortTitle,
    locale: site.locale,
    images: [{ url: site.ogImage, alt: personal.avatar.alt }],
  },
  twitter: { card: "summary", title: site.title, description: site.description, images: [site.ogImage] },
};

export const viewport: Viewport = { themeColor: site.themeColor, width: "device-width", initialScale: 1 };

// Hide animated elements before first paint; reveal everything if the animation layer never loads.
const antiFlashScript = `(function(){var d=document.documentElement;if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;d.classList.add('js-anim');setTimeout(function(){if(!d.classList.contains('anim-ready'))d.classList.remove('js-anim')},2500)})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={site.language} className={poppins.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: antiFlashScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
