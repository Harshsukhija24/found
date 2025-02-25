import { NextResponse } from "next/server";
import { connectDb } from "@/app/utils/connectdb";
import { getSession } from "next-auth/react";
import CompanySummary from "@/app/model/companies/CompanySummary";

export const POST = async (req) => {
  if (req.method === "POST") {
    const session = await getSession({ req });
    console.log("hello", session);

    const {
      companyName,
      bio,
      userId,
      overview,
      culture,
      benefit,
      founded,
      location,
      website,
      employees,
      JobDescription,
      ExperienceRequired,
      JobLink,
      JobLocation,
      SalaryRange,
      KeyResponsibilities,
      Qualifications,
      DateofJoining,
      skuId,
      founderName,
      founderLocation,
      founderPastExperience,
      coFounderName,
      coFounderLocation,
      coFounderPastExperience,
    } = await req.json();

    try {
      const { db } = await connectDb();
      const collection = db.collection("CompanySummary");

      await collection.insertOne({
        companyName,
        bio,
        userId,
        overview,
        culture,
        benefit,
        founded,
        location,
        website,
        employees,
        JobDescription,
        ExperienceRequired,
        JobLink,
        JobLocation,
        SalaryRange,
        KeyResponsibilities,
        Qualifications,
        DateofJoining,
        skuId,
        founderName,
        founderLocation,
        founderPastExperience,
        coFounderName,
        coFounderLocation,
        coFounderPastExperience,
      });

      return NextResponse.json({ message: "Saved" });
    } catch (error) {
      console.error("Error saving company summary:", error);
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      { message: "Method Not Allowed" },
      { status: 405 }
    );
  }
};
