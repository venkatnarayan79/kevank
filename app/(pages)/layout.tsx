
import type { Metadata } from "next";
import Script from "next/script";
import { Montserrat } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

import "./globals.css";

export const metadata: Metadata = {
  title: "Kavenk",
  description: "Rental Request App",
};

const mont = Montserrat({
  subsets: ["latin"],
  variable: "--font-mont",
  weight: ["400", "700"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Analytics via next/script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Z8G81VZVGZ"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Z8G81VZVGZ');
          `}
        </Script>
        {/* Tawk.to Chat Widget */}
        <Script id="tawk-init" strategy="afterInteractive">
          {`
            var Tawk_API=Tawk_API||{};
            Tawk_API.onLoad = function(){
              Tawk_API.setAttributes({
                widgetColor: '#2563eb'
              });
            };
            var Tawk_LoadStart=new Date();
            (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/684fbd8f57eabb190a266542/1itrnov2n';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
            })();
          `}
        </Script>
      </head>
      <body className={`antialiased ${mont.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
