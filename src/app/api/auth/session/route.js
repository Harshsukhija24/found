import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  const session = await getSession({ req });

  if (session) {
    NextResponse.json({ session });
  } else {
    NextResponse.json({ error: "Unauthorized" });
  }
};
