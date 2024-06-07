// pages/api/companies/Profile/Team.js
import { NextResponse } from "next/server";
import { connectDb } from "@/app/utils/connectdb";
import Team from "../../../../model/companies/Team"; // Use the correct model import
import mongoose from "mongoose";

export const POST = async (req) => {
  try {
    const {
      founderName,
      founderLocation,
      founderPastExperience,
      coFounderName,
      coFounderLocation,
      coFounderPastExperience,
    } = await req.json();
    await connectDb();

    const newTeam = new Team({
      founderName,
      founderLocation,
      founderPastExperience,
      coFounderName,
      coFounderLocation,
      coFounderPastExperience,
    });

    await newTeam.save();
    return NextResponse.json({ message: "Company created" }, { status: 201 });
  } catch (error) {
    console.error("Error creating company:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
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
