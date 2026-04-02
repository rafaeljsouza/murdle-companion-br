import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Murdle Companion BR",
  description: "Ferramenta de auxilio para resolver os misterios do livro-jogo Murdle. Decifrador e guia de signos.",
  openGraph: {
    title: "Murdle Companion BR",
    description: "Ferramenta de auxilio para resolver os misterios do livro-jogo Murdle. Decifrador e guia de signos.",
    url: "https://murdle-companion-br.vercel.app/",
    siteName: "Murdle Companion",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
