import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  try {
    // Parse the request body
    const { updatedTeam } = await request.json();

    // Initialize Supabase client
    const supabase = createClient();

    // Perform the insert operation
    const { data, error } = await supabase.from("teams").insert({
      team_name: updatedTeam.team_name,
      division: updatedTeam.division,
      day_constraint_1: updatedTeam.day_constraint_1,
      day_constraint_2: updatedTeam.day_constraint_2,
      time_preference: updatedTeam.time_preference,
    });

    // Handle errors from Supabase
    if (error) {
      console.error("Error updating team in Supabase:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
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
