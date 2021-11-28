import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createTheme, ThemeProvider } from "@mui/material";
import { cyan, teal } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: cyan[300],
      light: cyan[50],
      dark: cyan[700],
    },
    secondary: {
      main: teal[300],
      light: teal[100],
      dark: teal[700],
    },
    mode: 'light',
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />;
    </ThemeProvider>
  );
}

export default MyApp;
