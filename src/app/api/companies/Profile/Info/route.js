import { NextResponse } from "next/server";
import { connectDb } from "@/app/utils/connectdb";
import Info from "../../../../model/companies/Info";
import { getSession } from "next-auth/react";

export const POST = async (req) => {
  if (req.method === "POST") {
    const session = await getSession({ req });
    console.log(session);
    const { userId, founded, location, website, employees } = await req.json();

    const { db } = await connectDb();
    const collection = db.collection("infos");

    await collection.insertOne({
      userId,
      founded,
      location,
      website,
      employees,
    });

    return NextResponse.json({ message: "Company created" }, { status: 201 });
  }
};

export const GET = async (req) => {
  try {
    await connectDb();
    const infoList = await Info.find();
    return NextResponse.json(infoList, { status: 200 });
  } catch (error) {
    console.error("Error fetching companies:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const PUT = async (req) => {
  if (req.method === "PUT") {
    const session = await getSession({ req });
    console.log(session);

    const { userId, founded, location, website, employees } = await req.json();

    const { db } = await connectDb();
    const collection = db.collection("infos");

    const result = await collection.updateOne(
      { userId },
      {
        $set: {
          userId,
          founded,
          location,
          website,
          employees,
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
