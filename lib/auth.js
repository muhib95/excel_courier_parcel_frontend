import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: { label: "Phone", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              phone: credentials.phone,
              password: credentials.password,
            }),
          }
        );

        if (!res.ok) return null;
        console.log(res);
        const user = await res.json();
        if (user?.success === true) {
          return user; // Must return a plain object
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1 hour
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
  pages: {
    signIn: "/", // your custom login page
  },
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
