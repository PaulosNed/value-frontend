import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/layout/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Value College Prep",
  description: "Value is a platform that helps you to find the best scholarship opportunities for you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        {/* Nav section */}
        <NavBar />


        {/* Body */}
        {children}
        


        {/* footer */}
        </body>
    </html>
  );
}
