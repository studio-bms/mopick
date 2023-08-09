import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    // async session(session, user) {
    //   console.log("🚀 ~ file: route.ts:16 ~ session ~ session:", session);
    // },
    // async jwt(token, user, account, profile) {
    //   console.log("🚀 ~ file: route.ts:19 ~ jwt ~ token:", token);
    // },
  },
  secret: "test",
});

export { handler as GET, handler as POST };
