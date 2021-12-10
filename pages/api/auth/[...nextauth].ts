import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { signIn } from "next-auth/react";

export default NextAuth({
//   session: {
//     strategy: "jwt",
//     maxAge: 24 * 60 * 60, //1 day expiration
//   },
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
      authorization: {
        params: {
          prompt: "consent",
          access_type: "online",
          response_type: "code",
          redirect_uri: `${process.env.SERVER_HOST}/api/auth/callback/google`
        },
      },
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, account }) {
        // Persist the OAuth access_token to the token right after signin
        if (account) {
          token.accessToken = account.access_token
        }
        return token
      },
      async session({ session, token, user }) {
        // Send properties to the client, like an access_token from a provider.
        session.accessToken = token.accessToken
        return session
      },
    async signIn({account, profile}){
        return true;
    },
  },
  theme: {
    colorScheme: 'auto'
  }
});
