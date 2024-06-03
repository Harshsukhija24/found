import { NextResponse } from "next/server";
import AppliedData from "../../../data/Apply.json";

export const GET = async () => {
  try {
    const fetchedData = AppliedData;
    console.log("Fetched data:", fetchedData);
    return NextResponse.json(fetchedData);
  } catch (error) {
    console.error("Error fetching data:", error);

    return NextResponse.error(500, "Internal Server Error");
  }
};
