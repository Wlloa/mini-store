import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  createTheme,
  PaletteMode,
  ThemeProvider,
  CssBaseline,
} from "@mui/material";
import React, { createContext, useEffect, useMemo, useState } from "react";
import { getThemeModeStorage, getThemeOption } from "../utils/theme";
import { Navbar } from "../components/navbar";
import { SessionProvider } from "next-auth/react";

interface ThemeContext {
  mode: PaletteMode;
  toggleMode: () => void;
}

export const ThemeGlobalContext = createContext<ThemeContext>({
  toggleMode: () => {},
  mode: "light",
});

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [mode, setMode] = useState<PaletteMode>("light");

  useEffect(() => {
    //Initialize client side de theme from localStorage because SSR
    const modeStorage = getThemeModeStorage();
    if (modeStorage) {
      setMode(modeStorage);
    }
  }, []);

  const colorMode = useMemo(
    () => ({
      toggleMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(() => createTheme(getThemeOption(mode)), [mode]);

  return (
    <SessionProvider session={session}>
      <ThemeGlobalContext.Provider value={{ ...colorMode, mode }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Navbar />
          <Component {...pageProps} />
        </ThemeProvider>
      </ThemeGlobalContext.Provider>
    </SessionProvider>
  );
}

export default MyApp;
