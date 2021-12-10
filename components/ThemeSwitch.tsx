import * as React from "react";
import styled from "@emotion/styled";
import { StyledProps } from "../models/interfaces";
import { IconButton } from "@mui/material";
import { ThemeGlobalContext } from "../pages/_app";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { setThemeModeStorage } from "../utils/theme";

const UnStyledThemeSwitch = ({ className }: StyledProps): JSX.Element => {
  const { toggleMode, mode } = React.useContext(ThemeGlobalContext);

  const handleSwitch = () => {
    setThemeModeStorage(mode === "light" ? "dark" : "light");
    console.log(mode);
    toggleMode();
  };

  return (
    <div className={className}>
      <IconButton onClick={handleSwitch} color="inherit">
        {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </div>
  );
};

export const ThemeSwitch = styled(UnStyledThemeSwitch)({
  marginRight: 8,
});
