import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  try {
    // Parse the request body
    const { req } = await request.json();

    const supabase = createClient();
    const { error } = await supabase.from("schedule").delete().gt("id", 0);
    const { data } = await supabase.from("schedule").insert(req);

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
