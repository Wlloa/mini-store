import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "next-auth/react";
import { User } from "../../../models/user";
import { getCollection, insertOne } from "../../../utils/mongo";

interface Credential {
  email: string;
  password: string;
}

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30, // 1 month expiration
  },
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "johndoe@email.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials: Credential | undefined, req) {
        if (credentials && credentials.email) {
          console.log(credentials);

          //Search for user in db
          const result = await getCollection(
            "user",
            { email: credentials.email },
            { _id: -1 }
          );

          if (result.length === 0) {
            throw new Error("No user found");
          }

          const user = result[0];
          console.log(user);
          return {
            name: user.name,
            image: user.picture
          };
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
      authorization: {
        params: {
          prompt: "consent",
          access_type: "online",
          response_type: "code",
          redirect_uri: `${process.env.SERVER_HOST}/api/auth/callback/google`,
        },
      },
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: "/auth",
  },
  secret: "rlXaq5GLwQvxRFxFk7R5PKNxP/wucHkrBk5NUne5dbI=",
  callbacks: {
    async signIn({ account, profile }) {
      console.log(account);
      //Create user accout over google sigin
      if (profile) {
        // If the user already exists do not create him
        const users = await getCollection(
          "user",
          { email: profile.email },
          { _id: -1 }
        );
        if (users.length === 0) {
          // Create new user from Google login
          const user: User = {
            email: String(profile.email),
            picture: String(profile.picture),
            name: String(profile.name),
            googleUser: account.provider === "google",
          };
          const result = await insertOne("user", user);
        }
      }
      return true;
    },
  },
});
