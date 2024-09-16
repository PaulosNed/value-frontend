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
          <body className={`${inter.className}`}>
            {children}
            <Toaster />

            {/* footer */}
            <div className="py-10"></div>
          </body>
        </StateProvider>
      </html>
    </SessionWrapper>
  );
}
