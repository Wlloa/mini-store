import { Theme } from "@mui/material/styles";
import { I18n } from "next-translate";

export interface Translations {
    i18n: I18n;
}

export interface StyledProps {
    className?: string;
}

export interface ThemedProps {
    theme: Theme;
}