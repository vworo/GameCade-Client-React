import type { Metadata } from "next";
import { Inter } from "next/font/google"; 
import "./globals.scss";
import './Layout.css'

import RedirectToLobby from '@/components/RedirectToLobby';

import { GlobalStore } from '@/contexts/GlobalStore';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`min-h-svh flex flex-col ${inter.className}`}>
        <RedirectToLobby />
        
        <GlobalStore>
          { children }
        </GlobalStore>
      </body>
    </html>
  );
}
