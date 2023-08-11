import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthSession from "@/components/authSession";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "mopick",
  description: "모든 채용정보를 한 곳에",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthSession>{children}</AuthSession>
      </body>
    </html>
  );
}
