import { Geist } from "next/font/google";

export const geist = Geist({
  variable: "--font-geist",
  display: "swap",
  subsets: ["latin"],
  preload: true,
  style: ["normal"],
  weight: "variable",
  adjustFontFallback: true,
});

const fonts = geist.variable;

export default fonts;
