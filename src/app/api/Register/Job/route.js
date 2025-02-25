import UserRegisterModel from "@/app/model/UserRegister";
import { connectDb } from "../../../utils/connectdb";
import bcrypt from "bcryptjs";
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { firstName, lastName, email, password, company, userId } =
      await req.json();

    if (!firstName || !lastName || !email || !password || !company) {
      return NextResponse.json(
        { message: "All fields are necessary" },
        { status: 400 }
      );
    }

    await connectDb();

    // Check if the user already exists
    const existingUser = await UserRegisterModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists." },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the provided userId
    const newUser = new UserRegisterModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      company,
      userId, // Ensure userId is saved correctly
    });

    // Save the new user to the database
    await newUser.save();

    // Save userId to the session after successful registration
    const session = await getSession({ req });
    if (session) {
      session.userId = userId;
      await session.commit();
    }

    return NextResponse.json({ message: "User created" }, { status: 201 });
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
