import { connectDb } from "@/app/utils/connectdb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { getSession } from "next-auth/react";

export const POST = async (req) => {
  const session = await getSession({ req });

  console.log("route", session);

  if (req.method === "POST" || req.method === "PUT") {
    try {
      const {
        userId,
        relocation,
        authorized,
        jobtype,
        openToJobTypes,
        desiredLocations,
        openToRemoteWork,
        desiredSalary,
        companySizes,
      } = await req.json();

      if (!userId) {
        return NextResponse.json(
          { message: "Missing user ID" },
          { status: 400 }
        );
      }

      const { db } = await connectDb();
      const collection = db.collection("Preferences");

      if (req.method === "POST") {
        await collection.insertOne({
          userId,
          relocation,
          authorized,
          jobtype,
          openToJobTypes,
          desiredLocations,
          openToRemoteWork,
          desiredSalary,
          companySizes,
        });
        return NextResponse.json({ message: "Preferences created" });
      } else {
        const filter = { userId };
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
    } catch (error) {
      console.error("Error processing request:", error);
      return NextResponse.error({ message: "Error processing request" });
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
export const PUT = async (req) => {
  if (req.method === "PUT") {
    const session = await getSession({ req });
    console.log(session);

    const {
      userId,
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

    const result = await collection.updateOne(
      { userId },
      {
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
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: "Company not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Company updated" }, { status: 200 });
  }
};
