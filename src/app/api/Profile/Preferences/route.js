import { connectDb } from "@/app/utils/connectdb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export const POST = async (req) => {
  if (req.method === "POST" || req.method === "PUT") {
    const {
      relocation,
      authorized,
      jobtype,
      openToJobTypes,
      desiredLocations,
      openToRemoteWork,
      desiredSalary,
      companySizes,
    } = await req.json();
    const { db } = await connectDb();
    const collection = db.collection("Preferences");
    if (req.method === "POST") {
      await collection.insertOne({
        relocation,
        authorized,
        jobtype,
        openToJobTypes,
        desiredLocations,
        openToRemoteWork,
        desiredSalary,
        companySizes,
      });
      return NextResponse.created({ message: "Preferences created" });
    } else {
      const filter = { _id: req.body.id };
      const updateDoc = {
        $set: {
          relocation,
          authorized,
          jobtype,
          openToJobTypes,
          desiredLocations,
          openToRemoteWork,
          desiredSalary,
          companySizes,
        },
      };
      const result = await collection.updateOne(filter, updateDoc);

      if (result.modifiedCount === 1) {
        return NextResponse.ok({
          message: "Preferences data updated successfully",
        });
      }
    }
  } else {
    return NextResponse.methodNotAllowed();
  }
};

export const GET = async (req) => {
  if (req.method === "GET") {
    try {
      await connectDb();
      const { db } = mongoose.connection;
      const collection = db.collection("Preferences");

      const Preferences = await collection.find().toArray();

      return NextResponse.json(Preferences);
    } catch (error) {
      console.error("Error processing request:", error);
      return NextResponse.error({ message: "Error fetching Preferences" });
    }
  } else {
    return NextResponse.error({ message: "Method not allowed" });
  }
};
