// API endpoint
import { NextResponse } from "next/server";
import { connectDb } from "@/app/utils/connectdb";

export const GET = async (req, { params }) => {
  // Extract the user ID from the query parameters
  const skuId = params;
  console.log("hello", skuId);

  // Connect to the database
  const { db } = await connectDb();

  // Retrieve the user profile data
  const collection = db.collection("postajobs");
  const filterdata = await collection.find(skuId).toArray();
  console.log("Filtered data:", filterdata); // Log filtered data

  // Check if the user data exists

  // Return the user data
  return NextResponse.json(filterdata);
};
