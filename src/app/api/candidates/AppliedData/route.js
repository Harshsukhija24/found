import appliedData from "@/app/model/appliedData";
import { NextResponse } from "next/server";
import { connectDb } from "@/app/utils/connectdb";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      skuId,
      company_name,
      bio,
      location,
      description,
      salary,
      coverLetter,
    } = body;
    await connectDb();

    const newAppliedData = new appliedData({
      skuId,
      company_name,
      bio,
      location,
      description,
      salary,
      coverLetter,
    });

    await newAppliedData.save();
    return NextResponse.json({ message: "Saved" });
  } catch (error) {
    console.log("Error writing data to file:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export const GET = async (req) => {
  try {
    await connectDb();
    const db = mongoose.connection.db;

    const collection = db.collection("applieddatas");
    const applieddatas = await collection.find().toArray();

    return NextResponse.json(applieddatas, { status: 200 });
  } catch (error) {
    console.error("Error fetching applieddatas:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
