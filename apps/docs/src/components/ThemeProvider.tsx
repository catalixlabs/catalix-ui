"use client";

import React from "react";
import {
  ThemeProvider as NextThemeProvider,
  type ThemeProviderProps,
} from "next-themes";

export default function ThemeProvider({ ...props }: ThemeProviderProps) {
  return <NextThemeProvider {...props} />;
}
