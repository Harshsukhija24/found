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
  try {
    const {
      id,
      founderName,
      founderLocation,
      founderPastExperience,
      coFounderName,
      coFounderLocation,
      coFounderPastExperience,
    } = await req.json();
    await connectDb();

    const updatedTeam = await Team.findByIdAndUpdate(
      id,
      {
        founderName,
        founderLocation,
        founderPastExperience,
        coFounderName,
        coFounderLocation,
        coFounderPastExperience,
      },
      { new: true }
    );

    if (!updatedTeam) {
      return NextResponse.json({ message: "Team not found" });
    }

    return NextResponse.json({ message: "Company updated" }, { status: 200 });
  } catch (error) {
    console.error("Error updating company:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
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
