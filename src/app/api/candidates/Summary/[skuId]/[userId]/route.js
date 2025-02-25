import { NextResponse } from "next/server";
import { connectDb } from "@/app/utils/connectdb";

export const GET = async (req, { params }) => {
  const { skuId, userId } = params;
  console.log("SKU ID:", skuId);
  console.log("User ID:", userId);

  const { db } = await connectDb();

  try {
    const collection = db.collection("ProfileSummary");

    // Find documents with matching skuId
    const documents = await collection.find({ skuId }).toArray();

    // Filter documents to find those containing the specific userId in the profile or related fields
    const filteredData = documents.filter((doc) => {
      // Assuming userId is stored within the profile object or a similar nested structure
      // Adjust this condition based on your actual document structure
      return doc.profile.some((profileItem) => profileItem.userId === userId);
    });

    console.log("Filtered data:", filteredData);

    return NextResponse.json(filteredData);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.error({
      status: 500,
      message: "Internal server error",
    });
  }
};
