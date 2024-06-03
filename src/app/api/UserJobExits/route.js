import { connectDb } from "../../utils/connectdb";
import UserRegister from "../../model/UserRegister";
import { NextResponse } from "next/server";
export async function POST(req) {
  try {
    await connectDb();
    const { email } = await req.json();
    const user = await UserRegister.findOne({ email }).select("_id");

    if (user) {
      return NextResponse.json({ user });
    } else {
      return NextResponse.json({ user: null });
    }
  } catch (error) {
    console.error("Error checking user existence:", error);
    return NextResponse.json(
      { message: "Error checking user existence" },
      { status: 500 }
    );
  }
}
