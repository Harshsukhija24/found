import User from "../../../model/UserRegister";
import { connectDb } from "../../../utils/connectdb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { firstName, lastName, email, password, company } = await req.json();

    if (!firstName || !lastName || !company || !email || !password) {
      return NextResponse.json(
        { message: "All fields are necessary" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await connectDb();
    await User.create({
      firstName,
      company,
      lastName,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({ message: "User created" }, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
