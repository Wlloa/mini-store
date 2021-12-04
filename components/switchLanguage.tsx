import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";
import Link from "next/link";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import { Theme, useTheme } from "@mui/material";
import { ClassNames } from "@emotion/react";
import { StyledProps } from "../models/interfaces";

const UnStyledLanguage = ({className}: StyledProps) => {
  const { t, lang } = useTranslation("common");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const customTheme = useTheme();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={className}>
      <Link href="/" locale={lang === "es" ? "en" : "es"}>
        {lang === "es" ? "EN" : "ES"}
      </Link>
    </div>
  );
};

export const SwitchLanguage = styled(UnStyledLanguage)<StyledProps>(
  () => ({
      marginRight: 8,
  })
);
