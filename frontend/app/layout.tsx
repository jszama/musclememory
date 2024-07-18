import type { Metadata } from "next";
import { Roboto } from 'next/font/google'
import "./globals.css";
import React from "react";

import Template from "./template";

import Header from "./components/Header";
import BackButton from "./components/BackButton";

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
  console.log('RootLayout rendered');

  return (
    <>
      <html lang="en">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body className={roboto.className}>
          <Template>
            <Header/>
            {children}
            <BackButton/>
          </Template>
        </body>
      </html>
    </>
  );
}
