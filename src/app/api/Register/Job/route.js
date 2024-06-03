// pages/api/Register/Job.js

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import UserRegister from "../../../model/UserRegister";
import { connectDb } from "../../../utils/connectdb";
export async function POST(req) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, password, company } = body;

    if (!firstName || !lastName || !company || !email || !password) {
      return NextResponse.json(
        { message: "All fields are necessary" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await connectDb();
    const userId =
      Math.random().toString(36).substring(2, 9) +
      Math.random().toString(36).substring(2, 9);
    await UserRegister.create({
      firstName,
      company,
      lastName,
      email,
      password: hashedPassword,
      userId,
    });

    return NextResponse.json({ message: "User created" }, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
