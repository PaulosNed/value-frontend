import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

const BACKEND_URL = process.env.NEXT_PUBLIC_ENDPOINT;

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials, req) {
        console.log(
          "Authorizing credentials:",
          credentials,
          process.env.NEXT_PUBLIC_ENDPOINT
        );
        const res = await fetch(`${BACKEND_URL}/api/token/`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const body = await res.json();
        
        // If no error and we have user data, return it
        if (!body.error) {
          return body;
        } else {
          // Throw an error with a custom message if authentication fails
          throw new Error(body.error.detail || 'Invalid credentials');
        }
      },
    }),
  ],
  callbacks: {
    //     async signIn({ account, user }) {
    //       console.log("SignIn callback:", { account, user });
    //       if (
    //         account &&
    //         account.access_token &&
    //         account.provider.toLowerCase() === "google"
    //       ) {
    //         const response = await fetch(
    //           `${BACKEND_URL}/api/user/signin-with-google/`,
    //           {
    //             method: "POST",
    //             headers: {
    //               "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({ token: account.access_token }),
    //           }
    //         );
    //         const data = await response.json();
    //         if (response.ok) {
    //           account.access_token = data.access; // Store the Django token in the user object
    //           account.refresh_token = data.refresh; // Store the Django token in the user object
    //           return true;
    //         } else {
    //           return false;
    //         }
    //       }

    //       if (
    //         user &&
    //         user.accessToken &&
    //         account?.provider.toLowerCase() === "credentials"
    //       ) {
    //         account.access_token = user.accessToken as string; // Store the Django token in the user object
    //         account.refresh_token = user.refreshToken as string; // Store the Django token in the user object
    //         return true;
    //       }

    //       return false;
    //     },
    async jwt({ token, user, account }) {
      console.log("JWT callback:", { token, user, account });

      // Only assign access and refresh tokens on the initial login (when user and account are defined)
      if (user && account) {
        token.accessToken = (user as any).access;
        token.refreshToken = (user as any).refresh;

        const decoded: any = jwtDecode(token.accessToken as string);
        const userData = decoded.user;
        token.user = userData;
      }

      return token;
    },

    async session({ session, token }) {
      console.log("Session callback:", token);
      // Forward the accessToken to the session
      (session as any).accessToken = token.accessToken;
      (session as any).refreshToken = token.refreshToken;
      (session as any).user = token.user;
      return session;
    },
  },
  debug: true,
});

export { handler as GET, handler as POST };
