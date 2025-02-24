import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sujeito Pizza - A melhor pizzaria",
  description: "A melhor pizzaria do brasil",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster
          position="bottom-right"
          duration={2000}
          toastOptions={{
            style:{
              backgroundColor: "#f1f1f1",
              color: "#131313",
              borderColor: "#rgba(255,255,255, 0.5)"
            }
          }}
        />
        {children}
      </body>
    </html>
  );
}
