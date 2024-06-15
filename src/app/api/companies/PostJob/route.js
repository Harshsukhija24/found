import { NextResponse } from "next/server";
import { connectDb } from "@/app/utils/connectdb";
import mongoose from "mongoose";
import { getSession } from "next-auth/react";

export const POST = async (req) => {
  if (req.method === "POST") {
    const session = await getSession({ req });

    const {
      userId,
      JobDescription,
      ExperienceRequired,
      JobLink,
      JobLocation,
      SalaryRange,
      KeyResponsibilities,
      Qualifications,
      DateofJoining,
      info,
      company,
      team,
    } = await req.json();

    const skuId =
      Math.random().toString(36).substring(2, 9) +
      Math.random().toString(36).substring(2, 9);

    const { db } = await connectDb();
    const collection = db.collection("postajobs");

    const result = await collection.insertOne({
      userId,
      skuId,
      JobDescription,
      ExperienceRequired,
      JobLink,
      JobLocation,
      SalaryRange,
      KeyResponsibilities,
      Qualifications,
      DateofJoining,
      info,
      company,
      team,
    });

    return NextResponse.json({ message: "created" }, { status: 201 });
  } else {
    return NextResponse.error("Method Not Allowed", { status: 405 });
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
