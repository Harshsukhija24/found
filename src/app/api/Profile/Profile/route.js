import { connectDb } from "@/app/utils/connectdb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { getSession } from "next-auth/react";

export const POST = async (req) => {
  try {
    const session = await getSession({ req });

    const {
      userId,
      name,
      location,
      bio,
      role,
      website,
      linkedin,
      github,
      twitter,
      company,
      title,
      description,
      education,
      skills,
      achievement,
    } = await req.json();

    if (!userId) {
      return NextResponse.json({ message: "Missing user ID" }, { status: 400 });
    }

    const { db } = await connectDb();
    const profileCollection = db.collection("profile");

    await profileCollection.insertOne({
      userId,
      name,
      location,
      role,
      bio,
      website,
      linkedin,
      github,
      twitter,
      company,
      title,
      description,
      education,
      skills,
      achievement,
    });

    return NextResponse.json({ message: "Profile created" }, { status: 201 });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { message: "An error occurred while processing the request" },
      { status: 500 }
    );
  }
};

export const GET = async (req) => {
  if (req.method === "GET") {
    try {
      await connectDb();
      const { db } = mongoose.connection;
      const collection = db.collection("profile");

      const profile = await collection.find().toArray();

      return NextResponse.json(profile);
    } catch (error) {
      console.error("Error processing request:", error);
      return NextResponse.error({ message: "Error fetching profile" });
    }
  } else {
    return NextResponse.error({ message: "Method not allowed" });
  }
};
