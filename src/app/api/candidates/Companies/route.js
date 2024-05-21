import { NextResponse } from "next/server";
import Companies from "../../../data/companies.json";

export const GET = async () => {
  return NextResponse.json(Companies);
};
