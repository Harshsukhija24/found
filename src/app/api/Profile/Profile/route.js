import { connectDb } from "@/app/utils/connectdb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { getSession } from "next-auth/react";
export const POST = async (req) => {
  try {
    const session = await getSession({ req });

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

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

    // Fetch userId from register collection using session data
    const registerCollection = db.collection("userjobs");
    const user = await registerCollection.findOne({
      email: session.user.email,
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const userId = user.userId;

    const profileCollection = db.collection("profile");

    if (req.method === "POST") {
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
    } else if (req.method === "PUT") {
      const filter = { userId };
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

      const result = await profileCollection.updateOne(filter, updateDoc);

      if (result.modifiedCount === 1) {
        return NextResponse.json(
          { message: "Profile data updated successfully" },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { message: "No changes made to the profile" },
          { status: 200 }
        );
      }
    } else {
      return NextResponse.json(
        { message: "Method not allowed" },
        { status: 405 }
      );
    }
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
      const session = await getSession({ req });

      if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }

      await connectDb();
      const db = mongoose.connection.db;
      const profileCollection = db.collection("profile");

      const profiles = await profileCollection.find().toArray();

      return NextResponse.json(profiles, { status: 200 });
    } catch (error) {
      console.error("Error processing request:", error);
      return NextResponse.json(
        { message: "Error fetching profiles" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }
};
