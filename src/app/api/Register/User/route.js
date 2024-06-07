import User from "../../../model/Userjob"; // Import the User model

import { connectDb } from "../../../utils/connectdb";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, password } = body;

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { message: "All fields are necessary" },
        { status: 400 }
      );
    }

    await connectDb();

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists." },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a unique user ID
    const userId =
      Math.random().toString(36).substring(2, 9) +
      Math.random().toString(36).substring(2, 9);

    // Create a new user with the generated ID
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      userId,
    });

    // Save the new user to the database
    await newUser.save();

    return NextResponse.json({ message: "User created" }, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    await connectDb();

    const { email } = req.query; // Extract email from the request query parameters

    // Find the user with the provided email
    const user = await User.findOne({ email });

    if (!user) {
      // If user is not found, return appropriate error response
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Return the user details
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
