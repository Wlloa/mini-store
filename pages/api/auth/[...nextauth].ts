import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "next-auth/react";
import { IUser, User } from "../../../models/user";
// import { getCollection, insertOne } from "../../../utils/mongo";
import { hashPassword } from "../../../utils/utils";
import mongoose from "mongoose";
interface Credential {
  email: string;
  password: string;
}

const url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_DB}/store-${process.env.STORE_ENVIRONMENT}?retryWrites=true&w=majority`;

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
          mongoose
            .connect(url)
            .then(() => {
              console.log("connected to MongoDb");
            })
            .catch((error) => console.log(error));

          const user = await User.findOne({ email: credentials.email });
          mongoose.connection.close();

          if (!user) {
            throw new Error("No user found");
          }

          // Check if the user's account was created with google provider
          if (user.googleUser) {
            throw new Error("The user has an account with google provider");
          }

          return {
            name: user.name,
            image: user.picture,
            email: user.email,
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
      if (profile && account.provider === "google") {
        // If the user already exists do not create him
        mongoose
          .connect(url)
          .then(() => {
            console.log("connected to MongoDb");
          })
          .catch((error) => console.log(error));
        const user = await User.findOne({ email: profile.email });

        if (!user) {
          // Create new user from Google login
          const newUser = new User({
            email: String(profile.email),
            picture: String(profile.picture),
            name: String(profile.name),
            googleUser: account.provider === "google",
          });
          const createdUser = await newUser.save();
          mongoose.connection.close();
        }
      }
      return true;
    },
  },
});
