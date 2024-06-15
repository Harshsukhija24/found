// pages/api/companies/Profile/Team.js
import { NextResponse } from "next/server";
import { connectDb } from "@/app/utils/connectdb";
import Team from "../../../../model/companies/Team"; // Use the correct model import
import mongoose from "mongoose";
import { getSession } from "next-auth/react";

export const POST = async (req) => {
  if (req.method === "POST") {
    const session = await getSession({ req });
    console.log(session);

    const {
      userId,
      founderName,
      founderLocation,
      founderPastExperience,
      coFounderName,
      coFounderLocation,
      coFounderPastExperience,
    } = await req.json();

    const { db } = await connectDb();
    const collection = db.collection("team");
    await collection.insertOne({
      userId,
      founderName,
      founderLocation,
      founderPastExperience,
      coFounderName,
      coFounderLocation,
      coFounderPastExperience,
    });

    return NextResponse.json({ message: "Company created" }, { status: 201 });
  }
};

export const PUT = async (req) => {
  if (req.method === "PUT") {
    const session = await getSession({ req });
    console.log(session);

    const {
      userId,
      founderName,
      founderLocation,
      founderPastExperience,
      coFounderName,
      coFounderLocation,
      coFounderPastExperience,
    } = await req.json();

    const { db } = await connectDb();
    const collection = db.collection("team");

    const result = await collection.updateOne(
      { userId },
      {
        $set: {
          founderName,
          founderLocation,
          founderPastExperience,
          coFounderName,
          coFounderLocation,
          coFounderPastExperience,
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

export const GET = async (req) => {
  try {
    await connectDb();
    const { db } = mongoose.connection;

    const collection = db.collection("Teams"); // Make sure the collection name matches your setup
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
