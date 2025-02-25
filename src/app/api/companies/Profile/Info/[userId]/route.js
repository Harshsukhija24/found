// API endpoint
import { NextResponse } from "next/server";
import { connectDb } from "@/app/utils/connectdb";

export const GET = async (req, { params }) => {
  // Extract the user ID from the query parameters
  const userId = params;
  console.log("hello", userId);

  // Connect to the database
  const { db } = await connectDb();

  // Retrieve the user profile data
  const collection = db.collection("infos");
  const filterdata = await collection.find(userId).toArray();
  console.log("Filtered data:", filterdata); // Log filtered data

  // Check if the user data exists

  // Return the user data
  return NextResponse.json(filterdata);
};
