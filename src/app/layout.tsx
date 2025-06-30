import type { Metadata } from "next";
import "./globals.css";
import Script from 'next/script';
import { Providers } from "./providers";
export const metadata: Metadata = {
  title: "Ketero",
  description: "developed by Maruf",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  

  return (
    <html lang="en">
      <head>
        {/*{<Script 
          src="https://telegram.org/js/telegram-web-app.js" 
          strategy="beforeInteractive" 
        /> }*/}
      </head>
      <body
        className=" w-full p-2">
        <Providers>
          {children}

        </Providers>
      </body>
    </html>
  );
}
