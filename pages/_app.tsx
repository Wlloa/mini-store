import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  createTheme,
  PaletteMode,
  ThemeProvider,
  Theme,
  ThemeOptions,
  CssBaseline,
} from "@mui/material";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getThemeOption } from "../utils/theme";
import { Navbar } from "../components/navbar";

interface ThemeContext {
  mode: PaletteMode;
  toggleMode: ()=> void
}

export const ThemeGlobalContext = createContext<ThemeContext>({ toggleMode: () => {}, mode: 'light' });

function MyApp({ Component, pageProps }: AppProps) {
  const [mode, setMode] = useState<PaletteMode>("light");

  const colorMode = useMemo(
    () => ({
      toggleMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
      mode: mode
    }),
    []
  );

  const theme = useMemo(() => createTheme(getThemeOption(mode)), [mode]);

  return (
    <ThemeGlobalContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
      <CssBaseline />
        <Navbar />
        <Component {...pageProps} />;
      </ThemeProvider>
    </ThemeGlobalContext.Provider>
  );
}

export default MyApp;
