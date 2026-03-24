"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProvider as CustomThemeProvider } from "./theme-provider";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
        <CustomThemeProvider>{children}</CustomThemeProvider>
      </NextThemesProvider>
    </SessionProvider>
  );
}
