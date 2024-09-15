import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
// @ts-ignore
import clientPromise from "../../../lib/mongodb";

export async function POST(request: Request) {
  try {
    // Parse the request body
    const { req } = await request.json();

    // const supabase = createClient();
    // const { error } = await supabase.from("schedule").delete().gt("id", 0);
    // const { data } = await supabase.from("schedule").insert(req);

    // if (error) {
    //   console.error("Error updating team in Supabase:", error);
    //   return NextResponse.json({ error: error.message }, { status: 400 });
    // }

    // @ts-ignore
    const client = await clientPromise;
    const db = client.db("intelligent-scheduler");

    let data = await db.collection("schedule").deleteMany({});

    for (let i = 0; i < req.length; i++) {
      let myTeam = await db.collection("schedule").insertOne(req[i]);
    }

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
