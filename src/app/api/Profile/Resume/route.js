import { connectDb } from "@/app/utils/connectdb";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const { db } = await connectDb();
    const profileCollection = db.collection("Resume");

    // Parse FormData
    const formData = await req.formData();
    const resume = formData.get("resume");

    // Insert resume into MongoDB (store as a string)
    await profileCollection.insertOne({
      resume: resume.toString(), // Ensure it's stored as a string
      uploadDate: new Date(),
    });

    return NextResponse.json(
      { message: "Resume uploaded successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error uploading resume:", error);
    return NextResponse.json(
      { error: "Failed to upload resume" },
      { status: 500 }
    );
  }
};

export const GET = async (req) => {
  try {
    const { db } = await connectDb();
    const profileCollection = db.collection("Resume");

    // Retrieve the most recent resume
    const resumeDocument = await profileCollection.findOne(
      {},
      { sort: { uploadDate: -1 } }
    );

    if (!resumeDocument || !resumeDocument.resume) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    let resumeBuffer;
    if (typeof resumeDocument.resume === "string") {
      resumeBuffer = Buffer.from(resumeDocument.resume, "base64");
    } else if (resumeDocument.resume instanceof Buffer) {
      resumeBuffer = resumeDocument.resume;
    } else if (
      typeof resumeDocument.resume === "object" &&
      !(resumeDocument.resume instanceof Buffer)
    ) {
      resumeBuffer = Buffer.from(JSON.stringify(resumeDocument.resume));
    } else {
      console.error("Unsupported resume format:", typeof resumeDocument.resume);
      return NextResponse.json(
        { error: "Unsupported resume format" },
        { status: 500 }
      );
    }

    const base64Resume = resumeBuffer.toString("base64");
    const dataUri = `data:application/pdf;base64,${base64Resume}`;

    return NextResponse.json({
      resume: dataUri,
    });
  } catch (error) {
    console.error("Error retrieving resume:", error);
    return NextResponse.json(
      { error: "Failed to retrieve resume" },
      { status: 500 }
    );
  }
};
