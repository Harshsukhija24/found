import { NextResponse } from "next/server";
import { connectDb } from "@/app/utils/connectdb";

export const GET = async (req, { params }) => {
  const { skuId } = params; // Destructure to get skuId
  console.log("hello", skuId);
  const { db } = await connectDb();

  const collection = db.collection("ProfileSummary");
  const filterdata = await collection.find({ skuId }).toArray();
  console.log("Filtered data:", filterdata);

  return NextResponse.json(filterdata);
};
