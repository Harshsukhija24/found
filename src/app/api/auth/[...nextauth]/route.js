import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDb } from "../../../utils/connectdb";
import bcrypt from "bcryptjs";
import Userjobs from "../../../model/Userjob";
import Usereegisters from "../../../model/UserRegister";

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
        userType: { label: "User Type", type: "text" },
      },
      async authorize(credentials) {
        await connectDb();

        let user;
        if (credentials.userType === "jobseeker") {
          console.log(
            `JobSeeker: Trying to find user with email: ${credentials.email}`
          );
          user = await Userjobs.findOne({ email: credentials.email });
          console.log("JobSeeker: User found:", user);
        } else if (credentials.userType === "company") {
          console.log(
            `Company: Trying to find user with email: ${credentials.email}`
          );
          user = await Usereegisters.findOne({ email: credentials.email });
          console.log("Company: User found:", user);
        }

        if (!user) {
          console.error(`${credentials.userType}: User not found`);
          throw new Error("User not found");
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!passwordMatch) {
          console.error(`${credentials.userType}: Invalid password`);
          throw new Error("Invalid password");
        }

        console.log(`${credentials.userType}: User authorized`);
        return {
          userId: user.userId, // Change from id to userId
          firstName: user.firstName || null,
          lastName: user.lastName || null,
          email: user.email,
          userType: credentials.userType, // Include user type
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.userId; // Change from id to userId
        token.firstName = user.firstName || null;
        token.lastName = user.lastName || null;
        token.email = user.email;
        token.userType = user.userType; // Include user type
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          userId: token.userId,
          firstName: token.firstName || null,
          lastName: token.lastName || null,
          email: token.email,
          userType: token.userType,
        };
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/authentication/Login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
