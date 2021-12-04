import * as React from "react";
import styled from '@emotion/styled'
import { StyledProps } from "../models/interfaces";
import { IconButton } from "@mui/material";
import { ThemeGlobalContext } from "../pages/_app";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const UnStyledThemeSwitch = ({className}: StyledProps): JSX.Element => {
  const { toggleMode, mode } = React.useContext(ThemeGlobalContext);

  return (
    <div className={className}>
      <IconButton onClick={toggleMode} color="inherit">
        {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </div>
  );
};

export const ThemeSwitch = styled(UnStyledThemeSwitch)({
  marginRight: 8
});