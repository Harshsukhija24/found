import { connectDb } from "@/app/utils/connectdb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { getSession } from "next-auth/react";

export const POST = async (req) => {
  if (req.method === "POST") {
    const session = await getSession({ req });
    console.log(session);

    const { userId, nextJob, motivate, future, environment } = await req.json();
    const { db } = await connectDb();
    const collection = db.collection("Culture");
    await collection.insertOne({
      userId,
      nextJob,
      motivate,
      future,
      environment,
    });
    return NextResponse.json(
      { message: "Preferences created" },
      { status: 201 }
    );
  } else if (req.method === "PUT") {
    const { nextJob, motivate, future, environment, userId } = await req.json();
    const { db } = await connectDb();
    const collection = db.collection("Preferences");
    const filter = { userId };
    const updateDoc = {
      $set: {
        nextJob,
        motivate,
        future,
        environment,
      },
    };
    const result = await collection.updateOne(filter, updateDoc);
    if (result.modifiedCount === 1) {
      return NextResponse.json(
        { message: "Preferences data updated successfully" },
        { status: 200 }
      );
    }
  } else {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }
};
export const GET = async (req) => {
  if (req.method === "GET") {
    try {
      await connectDb();
      const { db } = mongoose.connection;
      const collection = db.collection("Culture");

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
