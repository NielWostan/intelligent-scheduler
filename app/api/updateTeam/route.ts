import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
// @ts-ignore
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

function createSlug(text: any) {
  return text
    .toLowerCase() // Convert to lowercase
    .trim() // Remove whitespace from both ends
    .replace(/[^\w\s-]/g, "") // Remove special characters except for hyphens and spaces
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Ensure there's only one hyphen between words
}

export async function POST(request: Request) {
  try {
    // Parse the request body
    const { updatedTeam } = await request.json();

    // Log the received data for debugging
    console.log("Received updated team data:", updatedTeam);

    // // Initialize Supabase client
    // const supabase = createClient();

    // // Perform the update operation
    // const { data, error } = await supabase
    //   .from("teams")
    //   .update({
    //     team_name: updatedTeam.team_name,
    //     division: updatedTeam.division,
    //     day_constraint_1: updatedTeam.day_constraint_1,
    //     day_constraint_2: updatedTeam.day_constraint_2,
    //     time_preference: updatedTeam.time_preference,
    //   })
    //   .eq("id", updatedTeam.id); // Match on the `id`

    // // Handle errors from Supabase
    // if (error) {
    //   console.error("Error updating team in Supabase:", error);
    //   return NextResponse.json({ error: error.message }, { status: 400 });
    // }

    // @ts-ignore
    const client = await clientPromise;
    const db = client.db("intelligent-scheduler");

    let data = await db.collection("teams").updateOne(
      { _id: new ObjectId(updatedTeam._id) },
      {
        $set: {
          division: updatedTeam.division,
          team_name: updatedTeam.team_name,
          day_constraint_1: updatedTeam.day_constraint_1,
          day_constraint_2: updatedTeam.day_constraint_2,
          time_preference: updatedTeam.time_preference,
          slug: createSlug(updatedTeam.team_name),
        },
      }
    );

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
