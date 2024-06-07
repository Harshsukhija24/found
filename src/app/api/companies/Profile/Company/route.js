import { NextResponse } from "next/server";
import { connectDb } from "@/app/utils/connectdb";
import Company from "../../../../model/companies/Company";
export const POST = async (req) => {
  try {
    const { companyName, bio, overview, culture, benefit } = await req.json();
    await connectDb();

    const newCompany = new Company({
      companyName,
      bio,
      overview,
      culture,
      benefit,
    });

    await newCompany.save();
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
    const { id, companyName, bio, overview, culture, benefit } =
      await req.json();
    await connectDb();

    const company = await Company.findByIdAndUpdate(
      id,
      {
        companyName,
        bio,
        overview,
        culture,
        benefit,
      },
      { new: true }
    );

    if (!company) {
      return NextResponse.json(
        { message: "Company not found" },
        { status: 404 }
      );
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

    const collection = db.collection("Company"); // Make sure the collection name matches your setup
    const Company = await collection.find().toArray();

    return NextResponse.json(Compnay, { status: 200 });
  } catch (error) {
    console.error("Error fetching teams:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
