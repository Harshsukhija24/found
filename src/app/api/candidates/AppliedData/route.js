import { NextResponse } from "next/server";
import { connectDb } from "@/app/utils/connectdb";
import appliedData from "@/app/model/appliedData";
import { getSession } from "next-auth/react";
import mongoose from "mongoose";

export async function POST(req) {
  const session = await getSession({ req });

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      userId,
      skuId,
      company_name,
      bio,
      location,
      description,
      salary,
      coverLetter,
    } = body;

    await connectDb();

    const newAppliedData = new appliedData({
      userId,
      skuId,
      company_name,
      bio,
      location,
      description,
      salary,
      coverLetter,
    });

    await newAppliedData.save();
    return NextResponse.json({ message: "Saved" });
  } catch (error) {
    console.error("Error saving application:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export const GET = async (req) => {
  try {
    await connectDb();
    const appliedDatas = await appliedData.find();
    return NextResponse.json(appliedDatas, { status: 200 });
  } catch (error) {
    console.error("Error fetching applied data:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
