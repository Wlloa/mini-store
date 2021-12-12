import React, { useRef, useState } from "react";
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

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const SignIn = () => {
  const { data: session } = useSession();
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
    console.log(email, pass);
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

  const handleRegister = () => {};
  const handleClose = () => {
    setLoading(false);
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
        }}
      >
        <StyledForm onSubmit={handleSignin}>
          <TextField
            type="email"
            id="email"
            variant="standard"
            label="email"
            sx={{
              ".MuiOutlinedInput-input": { p: 1 },
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
              ".MuiInputBase-input &:placeholder": { color: "primary.main" },
              fontSize: "16px"
            }}
            inputRef={passRef}
            required
          />
          <Button type="submit" sx={{ marginTop: 2 }} variant="outlined">
            {t("signin")}
          </Button>
          <Button onClick={handleRegister} sx={{marginTop:1}}>{t("register")}</Button>
          <Typography
            sx={{ textAlign: "center", marginBottom: 2, marginTop: 2 }}
          >
            {t("or")}
          </Typography>
          <Button
            onClick={() => signIn("google")}
            variant="contained"
            sx={{ marginBottom: 2 }}
          >
            {t("signin_with_google")}
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
