import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";
import i18nConfig from "../i18n.json";
import Link from "next/link";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export const SwitchLanguage = () => {
  const { locales, defaultLocale } = i18nConfig;
  const { t, lang } = useTranslation("common");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Link href="/" locale={lang === "es" ? "en" : "es"}>
          {lang === "es" ? "en" : "es"}
        </Link>
      </Button>
    </div>
  );
};
