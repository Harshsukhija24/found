// pages/api/candidates/Applicants/[userId].js

import { NextResponse } from "next/server";
import { connectDb } from "@/app/utils/connectdb";

export const GET = async (req, { params }) => {
  try {
    const { userId } = params; // Extract userId from request body
    console.log("userId:", userId);

    if (!userId) {
      return NextResponse.json(
        { error: "User ID parameter is missing" },
        { status: 400 }
      );
    }

    // Connect to the database
    const { db } = await connectDb();

    // Retrieve the user profile data where companyId matches userId
    const collection = db.collection("ProfileSummary");
    const filterdata = await collection.find({ companyId: userId }).toArray();

    // Check if the user data exists
    if (filterdata.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return the user data
    return NextResponse.json(filterdata);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
