import {
  createTheme,
  PaletteMode,
  PaletteOptions,
  ThemeOptions,
} from "@mui/material";
import { cyan, deepOrange, grey, teal } from "@mui/material/colors";
import { useEffect, useState } from "react";

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: cyan[300],
//       light: cyan[50],
//       dark: cyan[700],
//     },
//     secondary: {
//       main: teal[300],
//       light: teal[100],
//       dark: teal[700],
//     },
//     mode: "light",
//   },
// });

const primaryPalette = {
  main: "#3f51b5",
  secondary: "#6573c3",
  dark: "#2c387e",
  contrastText: "#fff",
};

const secondaryPalette = {
  main: "#f50057",
  secondary: "#f73378",
  dark: "#ab003c",
  contrastText: "#fff",
};

const errorPalette = {
  main: "#f44336",
  secondary: "#e57373",
  dark: "#d32f2f",
  contrastText: "#fff",
};

const warningPalette = {
  main: "#ff9800",
  secondary: "#ffb74d",
  dark: "#f57c00",
  contrastText: "#000000",
};

const infoPalette = {
  main: "#2196f3",
  secondary: "#64b5f6",
  dark: "#1976d2",
  contrastText: "#fff",
};

const successPalette = {
  main: "#4caf50",
  secondary: "#81c784",
  dark: "#388e3c",
  contrastText: "#000000",
};

const lightThemeOption: ThemeOptions = {
  palette: {
    background: {
      default: "#303030",
      paper: "#424242",
    },
    text: {
      primary: "#fff",
      secondary: "#ffffff",
      disabled: "#b1b1b1",
    },
    primary: primaryPalette,
    secondary: secondaryPalette,
    error: errorPalette,
    warning: warningPalette,
    info: infoPalette,
    success: successPalette,
  },
};

const darkThemeOption: ThemeOptions = {
  palette: {
    background: {
      default: "#fafafa",
      paper: "#fff",
    },
    text: {
      primary: "#4f4f4f",
      secondary: "#f4f4f4",
      disabled: "#f5f5f5",
    },
    primary: primaryPalette,
    secondary: secondaryPalette,
    error: errorPalette,
    warning: warningPalette,
    info: infoPalette,
    success: successPalette,
  },
};

const getThemeOption = (mode: PaletteMode): ThemeOptions => {
  return mode === "light" ? darkThemeOption : lightThemeOption;
};

const getThemeModeStorage = (): PaletteMode => {
  return localStorage.getItem("user-theme") as PaletteMode;
};

const setThemeModeStorage = (mode: PaletteMode): void => {
  console.log(mode);
  localStorage.setItem("user-theme", mode);
};

export { getThemeOption, getThemeModeStorage, setThemeModeStorage };
