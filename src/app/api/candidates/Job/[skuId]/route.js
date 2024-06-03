import { NextResponse } from "next/server";
import companies from "../../../../data/companies.json";

export const GET = async (req, { params }) => {
  try {
    const { skuId } = params; // Extract skuId from params object
    console.log(skuId);

    const allJobs = companies.companies.map((company) => company.jobs).flat();
    const filterData = allJobs.find((item) => item.skuId === skuId);

    if (!filterData) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(filterData, { status: 200 });
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return NextResponse.json(
      { message: "Error parsing JSON data" },
      { status: 500 }
    );
  }
};
