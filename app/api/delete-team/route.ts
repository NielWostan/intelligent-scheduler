import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
// @ts-ignore
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(request: Request) {
  try {
    // Parse the request body
    const { team } = await request.json();

    // @ts-ignore
    const client = await clientPromise;
    const db = client.db("intelligent-scheduler");

    let data = await db
      .collection("teams")
      .deleteMany({ _id: new ObjectId(team._id) });

    // Return the updated data
    return NextResponse.json({ data }, { status: 200 });
  } catch (err) {
    // Handle general errors, such as issues with request parsing
    console.error("Error processing request:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
