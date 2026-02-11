import type { Metadata } from "next";
import { Source_Code_Pro } from "next/font/google";
import "./globals.css"
import { LanguageProvider } from "./language-provider";
import { Navbar } from "@/components/nav-bar/navbar";
import Footer from "@/components/footer";
import SessionWrapper from "@/components/session-wrapper";

const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code-pro",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Portfolio M.Ali",
  icons: {
    icon: "/developer_portfolio_logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${sourceCodePro.variable} antialiased`}>
        <SessionWrapper>
          <LanguageProvider>
            <Navbar />
            {children}
            <Footer />
          </LanguageProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
