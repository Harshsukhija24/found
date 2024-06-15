import { connectDb } from "@/app/utils/connectdb";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
export const GET = async (req) => {
  try {
    await connectDb();
    const { db } = mongoose.connection;

    const collection = db.collection("applieddatas");
    const teams = await collection.find().toArray();

    return NextResponse.json(teams, { status: 200 });
  } catch (error) {
    console.error("Error fetching teams:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
