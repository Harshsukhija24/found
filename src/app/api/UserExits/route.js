import User from "../../../model/UserRegister";
import { connectDb } from "../../../utils/connectdb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email } = await req.json();

    await connectDb();

    const user = await User.findOne({ email });

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error checking user existence:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
