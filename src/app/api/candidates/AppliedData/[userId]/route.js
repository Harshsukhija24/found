// API endpoint
import { NextResponse } from "next/server";
import { connectDb } from "@/app/utils/connectdb";

export const GET = async (req, { params }) => {
  const { userId } = params;
  const { db } = await connectDb();

  const collection = db.collection("postajobs");
  const filterdata = await collection.find({ userId }).toArray();
  console.log("Filtered data:", filterdata);

  return NextResponse.json(filterdata);
};
