import { connectDb } from "@/app/utils/connectdb";
import { NextResponse } from "next/server";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false, // Disabling Next.js bodyParser to handle file uploads with formidable
  },
};

export default async function handler(req) {
  if (req.method === "POST") {
    const form = new formidable.IncomingForm();

    return new Promise((resolve, reject) => {
      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.error("Error parsing form:", err);
          resolve(
            NextResponse.json(
              { message: "Failed to upload resume" },
              { status: 500 }
            )
          );
          return;
        }

        const resume = files.resume;
        try {
          const { db } = await connectDb();
          const collection = db.collection("Resume");
          await collection.insertOne({ resume: resume });
          resolve(
            NextResponse.json({ message: "Resume created" }, { status: 201 })
          );
        } catch (error) {
          console.error("Error uploading resume:", error);
          resolve(
            NextResponse.json(
              { message: "Failed to upload resume" },
              { status: 500 }
            )
          );
        }
      });
    });
  } else {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }
}
