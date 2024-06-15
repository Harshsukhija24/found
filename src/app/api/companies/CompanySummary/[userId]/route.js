import { connectDb } from "../../../../utils/connectdb";
import Company from "@/app/model/companies/Company";
import Info from "@/app/model/companies/Info";
import Team from "@/app/model/companies/Team";
import CompanySummary from "@/app/model/companies/CompanySummary";
import postajob from "@/app/model/companies/postajob";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export const POST = async (req, { params }) => {
  try {
    await connectDb();

    const userId = params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid userId format");
    }

    const objectIdUserId = mongoose.Types.ObjectId(userId);

    const CompanyData = await Company.findById(objectIdUserId);
    const InfoData = await Info.findOne({ userId: objectIdUserId });
    const TeamData = await Team.find({ userId: objectIdUserId });
    const postajobdata = await postajob.find({ userId: objectIdUserId });

    const CompanySummaryData = {
      userId,
      ...CompanyData._doc, // spread the data into the summary
      ...InfoData._doc,
      TeamData,
      postajobdata,
    };

    const savedSummary = await CompanySummary.create(CompanySummaryData);

    return NextResponse.json(savedSummary);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
