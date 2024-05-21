import { NextResponse } from "next/server";
import Applied from "../../../data/Applied.json";

export const GET = async () => {
  return NextResponse.json(Applied);
};
