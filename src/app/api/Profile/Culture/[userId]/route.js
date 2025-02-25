import { NextResponse } from "next/server";
import { connectDb } from "@/app/utils/connectdb";

export const GET = async (req, { params }) => {
  const userId = params;
  console.log("UserID from request:", userId); // Log userId

  // Check if the user ID is provided
  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  // Connect to the database
  const { db } = await connectDb();

  // Retrieve the user profile data
  const collection = db.collection("Culture");
  const filterdata = await collection.find(userId).toArray();
  console.log("Filtered data:", filterdata); // Log filtered data

  // Check if the user data exists
  if (filterdata.length === 0) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Return the user data
  return NextResponse.json(filterdata);
};
