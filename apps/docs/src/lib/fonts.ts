import { Geist, Geist_Mono } from "next/font/google";

export const geist = Geist({
  variable: "--font-sans",
  display: "swap",
  subsets: ["latin"],
  preload: true,
  style: ["normal"],
  weight: "variable",
  adjustFontFallback: true,
});

export const geistMono = Geist_Mono({
  variable: "--font-mono",
  display: "swap",
  subsets: ["latin"],
  preload: true,
  style: ["normal"],
  weight: "variable",
  adjustFontFallback: true,
});

const fonts = geist.variable + " " + geistMono.variable;

export default fonts;
