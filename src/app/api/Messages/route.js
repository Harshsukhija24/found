import { connectDb } from "@/app/utils/connectdb";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  if (req.method === "POST") {
    try {
      const { userData, summaryData } = await req.json();

      const { db } = await connectDb();
      const collection = db.collection("Messages");

      // Check if the document with the same skuId already exists
      // If the document does not exist, insert the new document
      await collection.insertOne({
        userData,
        summaryData,
      });

      return NextResponse.json({ message: "Saved" });
    } catch (error) {
      console.error("Error saving message:", error);
      return NextResponse.error({
        status: 500,
        message: "Internal server error",
      });
    }
  }
};

export const GET = async (req) => {
  try {
    const { db } = await connectDb();
    const collection = db.collection("Messages");
    const Messages = await collection.find().toArray();

    return NextResponse.json(Messages, { status: 200 });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.error({
      status: 500,
      message: "Internal server error",
    });
  }
};
