import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const validated = loginSchema.safeParse(credentials);
        if (!validated.success) {
          throw new Error("Invalid credentials");
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: validated.data.email,
              password: validated.data.password,
            }),
          },
        );

        if (!res.ok) {
          throw new Error("Invalid credentials");
        }

        const user = await res.json();
        return {
          id: "1",
          email: validated.data.email,
          name: validated.data.email,
          token: user.access_token,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
      }
      return token;
    },
    session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
