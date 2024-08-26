import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/layout/NavBar";
import StateProvider from "@/components/provider/StateProvider";
import { Toaster } from "@/components/ui/toaster";
import SessionWrapper from "@/config/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Value College Prep",
  description:
    "Value is a platform that helps you to find the best scholarship opportunities for you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en">
        <StateProvider>
          <body className={`relative ${inter.className}`}>
            {/* Nav section */}
            <div className="fixed inset-0 z-40 h-20 md:h-24">
              <NavBar />
            </div>

            {/* Body */}
            <div className="mt-40">{children}</div>

            <Toaster />

            {/* footer */}
          </body>
        </StateProvider>
      </html>
    </SessionWrapper>
  );
}
