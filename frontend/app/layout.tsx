import type { Metadata } from "next";
import { Roboto } from 'next/font/google'
import "./globals.css";
import React from "react";

import Template from "./template";

export const metadata: Metadata = {
  title: "MuscleMemory",
  description: "Build muscles with memory.",
};

const roboto = Roboto({
  weight: ['400', '500'],
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en">
        <body className={roboto.className}>
          <Template>{children}</Template>
        </body>
      </html>
    </>
  );
}
