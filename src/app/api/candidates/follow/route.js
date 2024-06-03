import fs from "fs";
import path from "path";
import { NextResponse } from "next";

export async function POST(req) {
  try {
    const body = await req.json();
    const { id } = body;

    const sourceDataPath = path.resolve("./src/app/data/companies.json");
    const destinationPath = path.resolve("./src/app/data/follow.json");

    const sourceData = fs.readFileSync(sourceDataPath, "utf8");
    const jsonData = JSON.parse(sourceData).companies;
    const filteredCompany = jsonData.find((company) => company.id === id);

    if (!filteredCompany) {
      return NextResponse.json(
        { message: "Company with provided ID not found." },
        { status: 404 }
      );
    }

    const followData = fs.existsSync(destinationPath)
      ? JSON.parse(fs.readFileSync(destinationPath, "utf8"))
      : [];

    // Check if the company with the provided ID already exists in followData
    const existingIndex = followData.findIndex((company) => company.id === id);
    if (existingIndex !== -1) {
      return NextResponse.json(
        { message: "Company already exists in follow list." },
        { status: 400 } // Bad request status code
      );
    }

    // Add the company to the follow list
    followData.push(filteredCompany);

    fs.writeFileSync(destinationPath, JSON.stringify(followData, null, 2));

    return NextResponse.json(
      { message: "Data appended successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { message: "Failed to process request.", error: error.message },
      { status: 500 }
    );
  }
}
