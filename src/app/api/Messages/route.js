import { connectDb } from "@/app/utils/connectdb";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  if (req.method === "POST") {
    const { userData, summaryData } = await req.json();
    const { skuId } = userData;

    const { db } = await connectDb();
    const collection = db.collection("Messages");

    // Check if the document with the same skuId already exists
    const existingDocument = await collection.findOne({
      "userData.skuId": skuId,
    });

    if (existingDocument) {
      // If the document exists, return a message indicating that the document already exists
      return NextResponse.json({
        message: "Document with this SKU ID already exists",
      });
    } else {
      // If the document does not exist, insert the new document
      await collection.insertOne({
        userData,
        summaryData,
      });

      return NextResponse.json({ message: "Saved" });
    }
  }
};
export const GET = async (req) => {
  try {
    await connectDb();
    const { db } = mongoose.connection;

    const collection = db.collection("Messages"); // Make sure the collection name matches your setup
    const Messages = await collection.find().toArray();

    return NextResponse.json(Messages, { status: 200 });
  } catch (error) {
    console.error("Error fetching teams:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
