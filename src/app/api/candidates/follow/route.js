import fs from "fs";
import path from "path";
import { NextResponse } from "next";

export async function POST(req) {
  if (req.method === "POST") {
    try {
      const sourceDataPath = path.resolve("./src/app/data/companies.json");
      const sourceData = fs.readFileSync(sourceDataPath);
      const jsonData = JSON.parse(sourceData);
      const destinationPath = path.resolve("./src/app/data/follow.json");
      fs.writeFileSync(destinationPath, JSON.stringify(jsonData));

      return NextResponse.json(
        { message: "Data copied successfully!" },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { message: "Failed to copy data.", error: error.message },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      { message: "Method Not Allowed" },
      { status: 405 }
    );
  }
}
