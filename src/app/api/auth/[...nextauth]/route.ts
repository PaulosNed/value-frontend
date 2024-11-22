import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const BACKEND_URL = process.env.NEXT_PUBLIC_ENDPOINT;

const isTokenExpired = (token: any) => {
  const decoded = jwtDecode(token);
  const now = Math.floor(Date.now() / 1000);

  return decoded.exp! < now;
};

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials, req) {
        // console.log(
        //   "Authorizing credentials:",
        //   credentials,
        //   process.env.NEXT_PUBLIC_ENDPOINT
        // );
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
          throw new Error(body.error.detail || "Invalid credentials");
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
      // Only assign access and refresh tokens on the initial login (when user and account are defined)
      if (user && account) {
        token.accessToken = (user as any).access;
        token.refreshToken = (user as any).refresh;

        const decoded: any = jwtDecode(token.accessToken as string);
        const userData = decoded.user;
        token.user = userData;
        token.expired = false;
      }

      if (isTokenExpired(token.accessToken)) {
        try {
          const res = await fetch(`${BACKEND_URL}/api/token/refresh/`, {
            method: "POST",
            body: JSON.stringify({ refresh: token.refreshToken }),
            headers: { "Content-Type": "application/json" },
          });

          const data = await res.json();
          const decoded = jwtDecode(data.access);

          token.accessToken = data.access;
          token.refreshToken = data.refresh;
          token.user = (decoded as any).user;
          token.expired = false;
        } catch (error) {
          token.expired = true;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (token.expired) {
        signOut({ redirect: false })
          .then(() => {
            if (typeof window !== "undefined") {
              window.location.href = "/";
            }
          })
          .catch((error) => {
            console.error("Failed to sign out:", error);
          });
        return {
          ...session,
          error: "Refresh token expired",
        };
      }

      (session as any).accessToken = token.accessToken;
      (session as any).refreshToken = token.refreshToken;
      (session as any).user = token.user;

      return session;
    },
  },
  debug: true,
});

export { handler as GET, handler as POST };
