import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cricket 07",
  description:
    "EA Sports Cricket 07 (2006, Windows) running in a browser tab, with game controllers and online 1v1 multiplayer.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/app-manifest.json",
  appleWebApp: {
    capable: true,
    title: "Cricket 07",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#09090b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="wide" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/inter-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (new URLSearchParams(location.search).has("4x3")) {
                document.documentElement.classList.remove("wide");
              } else {
                document.documentElement.classList.add("wide");
              }
              (function () {
                var t = new URLSearchParams(location.search).get("touch");
                if (t === "1" || (t !== "0" && window.matchMedia && matchMedia("(pointer: coarse)").matches))
                  document.documentElement.classList.add("touch");
                if (new URLSearchParams(location.search).has("embed"))
                  document.documentElement.classList.add("embed");
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
