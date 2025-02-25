// API endpoint
import { NextResponse } from "next/server";
import { connectDb } from "@/app/utils/connectdb";

export const GET = async (req) => {
  try {
    const { userId } = await req.json(); // Extract userId from request body
    console.log("Received userId:", userId);

    const { db } = await connectDb(); // Connect to MongoDB

    const collection = db.collection("Messages");
    // Assuming you want to filter data based on userId
    const filterData = await collection
      .find({ "userData.userId": userId })
      .toArray();
    console.log("Filtered data:", filterData);

    return NextResponse.json(filterData); // Return filtered data as JSON response
  } catch (error) {
    console.error("Error in GET request:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
