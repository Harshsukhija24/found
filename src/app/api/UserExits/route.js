// api/userExist.js

import { connectDb } from "../../utils/connectdb";
import User from "../../model/Userjob";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDb();
    const { email } = await req.json();
    const user = await User.findOne({ email }).select("_id");
    console.log("user: ", user);
    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
    // If there's an error, return an error response
    return NextResponse.error(new Error("Error checking user existence"));
  }
}
