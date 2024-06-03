import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      skuId,
      company_name,
      bio,
      location,
      description,
      salary,
      coverLetter,
    } = body;
    const destinationPath = path.resolve("./src/app/data/apply.json");
    const existingData = fs.existsSync(destinationPath)
      ? JSON.parse(fs.readFileSync(destinationPath, "utf8"))
      : [];
    const applicationExists = existingData.some((app) => app.skuId === skuId);
    if (applicationExists) {
      return NextResponse.json({
        message: "Application with this SKU ID already exists",
      });
    }
    const newapplication = {
      skuId,
      company_name,
      bio,
      location,
      description,
      salary,
      coverLetter,
    };
    const updatedData = [...existingData, newapplication];
    fs.writeFileSync(destinationPath, JSON.stringify(updatedData, null, 2));
    console.log("Data has been written to the file:", updatedData); // Log the updated data
    return NextResponse.json({ message: "Application is submitted" });
  } catch (error) {
    console.log("Error writing data to file:", error); // Log any errors
    return NextResponse.error(500, "Internal Server Error");
  }
}
