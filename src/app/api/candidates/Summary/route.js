import { connectDb } from "@/app/utils/connectdb";
import mongoose from "mongoose";
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  if (req.method === "POST") {
    const session = await getSession({ req });
    console.log("hello", session);

    const { skuId, coverLetter, profile, preference, culture } =
      await req.json();

    const { db } = await connectDb();
    const collection = db.collection("ProfileSummary");

    await collection.insertOne({
      skuId,
      coverLetter,
      profile,
      preference,
      culture,
    });

    return NextResponse.json({ message: "Saved" });
  }
};
export const GET = async (req) => {
  if (req.method === "GET") {
    try {
      await connectDb();
      const { db } = mongoose.connection;
      const collection = db.collection("ProfileSummary");

      const Culture = await collection.find().toArray();

      return NextResponse.json(Culture);
    } catch (error) {
      console.error("Error processing request:", error);
      return NextResponse.error({ message: "Error fetching profiles" });
    }
  } else {
    return NextResponse.error({ message: "Method not allowed" });
  }
};
