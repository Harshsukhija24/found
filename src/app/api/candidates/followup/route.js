import { NextResponse } from "next/server";
import followup from "../../../data/follow.json";

export const GET = async () => {
  return NextResponse.json(followup);
};
