import { NextResponse } from "next/server";
import { connectDb } from "@/app/utils/connectdb";
import Postajob from "@/app/model/companies/postajob";
import mongoose from "mongoose";

export const POST = async (req) => {
  try {
    const {
      JobDescription,
      ExperienceRequired,
      JobLink,
      JobLocation,
      SalaryRange,
      KeyResponsibilities,
      Qualifications,
      DateofJoining,
    } = await req.json();

    await connectDb();

    const skuId =
      Math.random().toString(36).substring(2, 9) +
      Math.random().toString(36).substring(2, 9);

    const newPostajob = new Postajob({
      skuId,
      JobDescription,
      ExperienceRequired,
      JobLink,
      JobLocation,
      SalaryRange,
      KeyResponsibilities,
      Qualifications,
      DateofJoining,
    });

    await newPostajob.save();

    return NextResponse.json({ message: "created" }, { status: 201 });
  } catch (error) {
    console.error("Error creating postajob:", error);
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

    const collection = db.collection("postajobs"); // Ensure this matches your actual collection name
    const postajobs = await collection.find().toArray();

    return NextResponse.json(postajobs, { status: 200 });
  } catch (error) {
    console.error("Error fetching postajobs:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
