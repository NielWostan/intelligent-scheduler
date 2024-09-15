import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  try {
    // Parse the request body
    const { updatedTeam } = await request.json();

    // Log the received data for debugging
    console.log("Received updated team data:", updatedTeam);

    // Check if the necessary fields are present
    if (!updatedTeam.id || !updatedTeam.team_name) {
      return NextResponse.json(
        { error: "Missing required fields: id or team_name" },
        { status: 400 }
      );
    }

    // Initialize Supabase client
    const supabase = createClient();

    // Perform the update operation
    const { data, error } = await supabase
      .from("teams")
      .update({
        team_name: updatedTeam.team_name,
        division: updatedTeam.division,
        day_constraint_1: updatedTeam.day_constraint_1,
        day_constraint_2: updatedTeam.day_constraint_2,
        time_preference: updatedTeam.time_preference,
      })
      .eq("id", updatedTeam.id); // Match on the `id`

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
