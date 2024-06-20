// API endpoint
import { NextResponse } from "next/server";
import { connectDb } from "@/app/utils/connectdb";

export const GET = async (req, { params }) => {
  try {
    const { userId } = params;
    const { db } = await connectDb();

    const collection = db.collection("applieddatas");
    const filterdata = await collection.find({ userId }).toArray();
    console.log("Filtered data:", filterdata);

    return NextResponse.json(filterdata);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
