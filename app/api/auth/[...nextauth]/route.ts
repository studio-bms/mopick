import axios from "axios";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextRequest } from "next/server";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope:
            "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/user.phonenumbers.read",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "name@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any, req) {
        const { email, password } = credentials;
        const res = await axios.post("http://localhost:3030/auth/login", {
          email,
          password,
        });
        console.log(res.data);
        if (res.data.accessToken) {
          return res.data;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account?.provider === "google") {
        if (user) {
          token.user = user;
          try {
            const res = await axios.post(
              "http://localhost:3030/auth/login/google",
              { email: user.email, name: user.name },
            );
            token.accessToken = res.data.accessToken;
          } catch (error) {
            console.log(error);
          }
        }
      } else if (account?.provider === "credentials") {
        token.accessToken = user?.accessToken;
        token.user = user?.user;
      }
      console.log(token);
      return token;
    },
    async session({ session, token }: any) {
      session.accessToken = token.accessToken;
      session.user = token.user;
      return session;
    },
  },
  secret: "test",
});

export { handler as GET, handler as POST };
