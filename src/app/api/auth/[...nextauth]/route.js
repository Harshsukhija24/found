import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDb } from "../../../utils/connectdb";
import bcrypt from "bcryptjs";
import JobSeeker from "../../../model/Userjob";
import Company from "../../../model/UserRegister";
import { getSession } from "next-auth/react";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Job Seeker",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jdoe@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await connectDb();
          const user = await JobSeeker.findOne({ email: credentials.email });

          if (!user) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!passwordMatch) {
            return null;
          }

          return user;
        } catch (error) {
          console.error("Error:", error);
        }
      },
    }),
    CredentialsProvider({
      name: "Company",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "company@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await connectDb();
          const user = await Company.findOne({ email: credentials.email });

          if (!user) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!passwordMatch) {
            return null;
          }

          return user;
        } catch (error) {
          console.error("Error:", error);
        }
      },
    }),
  ],
  strategy: "jwt",
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: {
      jobSeeker: "/JobSeekers/SignIn",
      company: "/Companies/SignIn",
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
