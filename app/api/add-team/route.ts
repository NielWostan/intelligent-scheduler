import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
// @ts-ignore
import clientPromise from "../../../lib/mongodb";
import { error } from "console";

function getDivision(div: string) {
  const divisions = [
    "Summer Men's 24 | Summer Men's A Division",
    "Summer Men's 24 | Summer Men's B Division",
    "Summer Men's 24 | Summer Men's C Division",
    "Summer Men's 24 | Summer Men's D Division",
    "Summer Men's 24 | Summer Men's E Division",
    "Summer Co-Ed 24 | Co-Ed A Division",
    "Summer Co-Ed 24 | Co-Ed B Division",
    "Summer Co-Ed 24 | Co-Ed C Division",
    "Summer Co-Ed 24 | Co-Ed D Division",
    "Summer Co-Ed 24 | Co-Ed E Division",
  ];

  for (let i = 0; i < divisions.length; i++) {
    if (
      div &&
      divisions[i]
        .toLowerCase()
        .replace(/'/g, "")
        .replace(/-/g, "")
        .includes(div.toLowerCase())
    ) {
      return divisions[i];
    }
  }
  return "Summer Men's/Co-Ed 24 | Not Assigned";
}

export async function POST(request: Request) {
  try {
    // Parse the request body
    const { updatedTeam } = await request.json();

    updatedTeam.division = getDivision(updatedTeam.division);

    // // Initialize Supabase client
    // const supabase = createClient();

    // // Perform the insert operation
    // const { data, error } = await supabase.from("teams").insert({
    //   team_name: updatedTeam.team_name,
    //   division: updatedTeam.division,
    //   day_constraint_1: updatedTeam.day_constraint_1,
    //   day_constraint_2: updatedTeam.day_constraint_2,
    //   time_preference: updatedTeam.time_preference,
    // });

    // // Handle errors from Supabase
    // if (error) {
    //   console.error("Error updating team in Supabase:", error);
    //   return NextResponse.json({ error: error.message }, { status: 400 });
    // }

    // @ts-ignore
    const client = await clientPromise;
    const db = client.db("intelligent-scheduler");

    let data = await db.collection("teams").insertOne(updatedTeam);

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
