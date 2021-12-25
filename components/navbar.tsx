import { AppBar } from "@mui/material";
import React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button, { ButtonProps } from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import useTranslation from "next-translate/useTranslation";
import { SwitchLanguage } from "./switchLanguage";
import { useTheme } from "@mui/material/styles";
import { ThemeSwitch } from "./ThemeSwitch";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { palette } from "@mui/system";
import { cyan, deepOrange, grey, teal } from "@mui/material/colors";

const HoverBtn = styled(Button)<ButtonProps>(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
  },
}));

export const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const theme = useTheme();
  const { data: session } = useSession();

  const { t } = useTranslation("common");

  const pages = [t("products"), t("orders")];

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // if not session do not display the navbar
  if (!session) {
    return null;
  }

  return (
    <AppBar
      position="static"
      style={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
      }}
    >
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            align="center"
          >
            Store
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            Store
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <HoverBtn
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  display: "block",
                  color: theme.palette.text.primary,
                }}
              >
                {page}
              </HoverBtn>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
            <SwitchLanguage />
            <ThemeSwitch />
            {session ? (
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {!session.user?.image ? (
                  <Avatar alt="User avatar" sx={{ bgcolor: cyan[500] }}>
                    {session.user?.email?.slice(0, 1)}
                  </Avatar>
                ) : (
                  <Avatar
                    alt="User avatar"
                    src={session?.user?.image}
                  />
                )}
              </IconButton>
            ) : (
              <Link href={"/auth"}>{t("signin")}</Link>
            )}

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">{t("profile")}</Typography>
              </MenuItem>

              <MenuItem onClick={() => signOut()}>
                <Typography textAlign="center">{t("logout")}</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
