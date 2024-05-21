import { connectDb } from "../../utils/connectdb";
import UserRegister from "../../model/UserRegister";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDb();
    const { email } = await req.json();
    const user = await UserRegister.findOne({ email }).select("_id");
    console.log("user: ", user);
    if (user) {
      return NextResponse.json({ user });
    } else {
      return NextResponse.json({ user: null });
    }
  } catch (error) {
    console.log(error);
    // If there's an error, return an error response
    return NextResponse.error(new Error("Error checking user existence"));
  }
}
