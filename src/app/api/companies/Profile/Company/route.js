import { NextResponse } from "next/server";
import { connectDb } from "@/app/utils/connectdb";
import Company from "../../../../model/companies/Company"; // Assuming you have a Company model
import { getSession } from "next-auth/react";

export const POST = async (req) => {
  if (req.method === "POST") {
    const session = await getSession({ req });
    console.log(session);

    const { userId, companyName, bio, overview, culture, benefit } =
      await req.json();

    const { db } = await connectDb();
    const collection = db.collection("Company");

    await collection.insertOne({
      userId,
      companyName,
      bio,
      overview,
      culture,
      benefit,
    });

    return NextResponse.json({ message: "Company created" }, { status: 201 });
  }
};

export const PUT = async (req) => {
  if (req.method === "PUT") {
    const session = await getSession({ req });
    console.log(session);

    const { userId, companyName, bio, overview, culture, benefit } =
      await req.json();
    console.log(userId, "helleo");

    const { db } = await connectDb();
    const collection = db.collection("Company");

    const result = await collection.updateOne(
      { userId }, // Filter by userId
      {
        $set: {
          companyName,
          bio,
          overview,
          culture,
          benefit,
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: "Company not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Company updated" }, { status: 200 });
  }
};
