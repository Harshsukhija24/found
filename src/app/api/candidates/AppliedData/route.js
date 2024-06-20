import { NextResponse } from "next/server";
import { connectDb } from "@/app/utils/connectdb";
import postajob from "@/app/model/companies/postajob";
import { getSession } from "next-auth/react";
import mongoose from "mongoose";

export const POST = async (req) => {
  if (req.method === "POST") {
    const session = await getSession({ req });
    console.log("hello", session);

    const { userId, skuId, coverLetter, companyData } = await req.json();

    const { db } = await connectDb();
    const collection = db.collection("applieddatas");

    await collection.insertOne({
      userId,
      skuId,
      coverLetter,
      companyData,
    });

    return NextResponse.json({ message: "Saved" });
  }
};

export const GET = async (req) => {
  try {
    await connectDb();
    const { db } = mongoose.connection;

    const collection = db.collection("postajobs"); // Make sure the collection name matches your setup
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
