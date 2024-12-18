"use client";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/store";
import React from "react";

// const spaceGrotesk = Space_Grotesk({
//   subsets: ["latin"],
//   display: "swap",
//   variable: "--font-space-grotesk",
// });

// export const metadata = {
//   title: "Dashboard",
//   description: "A modern dashboard application",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
