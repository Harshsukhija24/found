import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDb } from "../../../utils/connectdb";
import bcrypt from "bcryptjs";
import Userjobs from "../../../model/UserJob";
import Usereegisters from "../../../model/UserRegister"; // Adjusted import

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "JobSeekerCredentialsProvider",
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
          const user = await Userjobs.findOne({ email: credentials.email });

          if (!user) {
            throw new Error("User not found");
          }

          const passwordMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!passwordMatch) {
            throw new Error("Invalid password");
          }

          return user;
        } catch (error) {
          console.error("Authentication error:", error.message);
          return null;
        }
      },
    }),
    CredentialsProvider({
      name: "CompanyCredentialsProvider",
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
          const user = await Usereegisters.findOne({
            email: credentials.email,
          });

          if (!user) {
            throw new Error("User not found");
          }

          const passwordMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!passwordMatch) {
            throw new Error("Invalid password");
          }

          return user;
        } catch (error) {
          console.error("Authentication error:", error.message);
          return null;
        }
      },
    }),
  ],
  session: {
    jwt: true, // Enable JWT sessions
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: {
      jobSeeker: "/authentication/Registration_job",
      company: "/authentication/Registration_companies",
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
