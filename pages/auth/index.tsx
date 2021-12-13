import React, { FormEvent, useRef, useState } from "react";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import {
  Backdrop,
  Box,
  Button,
  Card,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import {
  getSession,
  signIn,
  SignInResponse,
  useSession,
} from "next-auth/react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { ThemedProps } from "../../models/interfaces";
import { useTheme } from "@mui/material";
import { palette } from "@mui/system";

const StyledForm = styled.form<ThemedProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 8px;
`;

const SignIn = () => {
  const { data: session } = useSession();
  const theme = useTheme();
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const { t } = useTranslation("common");

  const handleSignin = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    const email = emailRef.current?.value;
    const pass = passRef?.current?.value;
    const result = await signIn("credentials", {
      redirect: false,
      email: email,
      password: pass,
    });

    console.log(result);
    //@ts-ignore
    if (!result.error) {
      router.replace("/");
      setLoading(false);
    }
    setLoading(false);
  };

  const handleGoogleSignin = () => {
    setLoading(true);
    signIn("google");
  };

  const handleRegister = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    const password = passRef.current?.value;
    const email = emailRef.current?.value;
    const url = `${process.env.NEXTAUTH_URL}/api/auth/signup`;

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.ok) {
      const signedUser = await signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
      });

      //@ts-ignore
      if (!signedUser.error) {
        setLoading(false);
        router.replace("/");
      }
    }
  };

  return (
    <Box
      sx={{
        p: 2,
        minWidth: "100%",
        minHeight: "100vh",
        bgcolor: "background.paper",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          minWidth: 300,
          p: 1,
          alignItems: "center",
          border: "0.5px solid primary.main",
        }}
      >
        <Button
          onClick={handleGoogleSignin}
          variant="contained"
          sx={{ width: "100%", marginTop: 1 }}
        >
          {t("signin_with_google")}
        </Button>
        <Typography sx={{ textAlign: "center", marginBottom: 1, marginTop: 1 }}>
          {t("or")}
        </Typography>
        <Typography
          sx={{
            textAlign: "center",
            marginBottom: 1,
            marginTop: 1,
            fontSize: 14,
          }}
        >
          {t("custom-email")}
        </Typography>
        <StyledForm onSubmit={handleSignin} theme={theme}>
          <TextField
            type="email"
            id="email"
            variant="standard"
            label="email"
            sx={{
              ".MuiOutlinedInput-input": { p: 1 },
              ".MuiInputLabel-root": { color: "text.primary" },
            }}
            inputRef={emailRef}
            required
          />
          <TextField
            type="password"
            id="password"
            variant="standard"
            label="password"
            sx={{
              ".MuiOutlinedInput-input": { p: 1, fontSize: "16px" },
              ".MuiInputLabel-root": { color: "text.primary" },
              fontSize: "16px",
              marginTop: 1,
            }}
            inputRef={passRef}
            required
          />
          <Button
            type="submit"
            sx={{ marginTop: 2, color: "text.primary" }}
            variant="outlined"
          >
            {t("signin")}
          </Button>
          <Typography sx={{ textAlign: "center", marginTop: 2, fontSize: 14 }}>
            {t("signup-text")}
          </Typography>
          <Button
            onClick={(event) => handleRegister(event)}
            sx={{ marginTop: 1, color: "text.main" }}
          >
            {t("register")}
          </Button>
        </StyledForm>
      </Card>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: { session: session },
  };
};

export default SignIn;
