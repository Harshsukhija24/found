import { connectDb } from "@/app/utils/connectdb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export const POST = async (req) => {
  try {
    if (req.method === "POST" || req.method === "PUT") {
      const {
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

      const { db } = await connectDb();
      const collection = db.collection("profile");

      if (req.method === "POST") {
        await collection.insertOne({
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

        return NextResponse.created({ message: "Profile created" });
      } else {
        const filter = { _id: req.body.id };
        const updateDoc = {
          $set: {
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
          },
        };

        const result = await collection.updateOne(filter, updateDoc);

        if (result.modifiedCount === 1) {
          return NextResponse.ok({
            message: "Profile data updated successfully",
          });
        }
      }
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.error({
      message: "An error occurred while processing the request",
    });
  }
};

export const GET = async (req) => {
  if (req.method === "GET") {
    try {
      await connectDb();
      const { db } = mongoose.connection;
      const collection = db.collection("profile");

      const profiles = await collection.find().toArray();

      return NextResponse.json(profiles);
    } catch (error) {
      console.error("Error processing request:", error);
      return NextResponse.error({ message: "Error fetching profiles" });
    }
  } else {
    return NextResponse.error({ message: "Method not allowed" });
  }
};
