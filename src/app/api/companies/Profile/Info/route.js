import { NextResponse } from "next/server";
import { connectDb } from "@/app/utils/connectdb";
import Info from "../../../../model/companies/Info";
import mongoose from "mongoose";
export const POST = async (req) => {
  try {
    const { founded, location, website, employees } = await req.json();
    await connectDb();

    const newInfo = new Info({
      founded,
      location,
      website,
      employees,
    });

    await newInfo.save();
    return NextResponse.json({ message: "Company created" }, { status: 201 });
  } catch (error) {
    console.error("Error creating company:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const PUT = async (req) => {
  try {
    const { id, founded, location, website, employees } = await req.json();
    await connectDb();

    const updatedInfo = await Info.findByIdAndUpdate(
      id,
      {
        founded,
        location,
        website,
        employees,
      },
      { new: true }
    );

    if (!updatedInfo) {
      return NextResponse.json({ message: "Info not found" });
    }

    return NextResponse.json({ message: "Company updated" }, { status: 200 });
  } catch (error) {
    console.error("Error updating company:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const GET = async (req) => {
  try {
    await connectDb();
    const { db } = mongoose.connection;

    const collection = db.collection("Info"); // Make sure the collection name matches your setup
    const Info = await collection.find().toArray();

    return NextResponse.json(Info, { status: 200 });
  } catch (error) {
    console.error("Error fetching teams:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
