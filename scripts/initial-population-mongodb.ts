import { teams } from "../_data/_teams";
// @ts-ignore
import clientPromise from "../lib/mongodb";

function createSlug(text: any) {
  return text
    .toLowerCase() // Convert to lowercase
    .trim() // Remove whitespace from both ends
    .replace(/[^\w\s-]/g, "") // Remove special characters except for hyphens and spaces
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Ensure there's only one hyphen between words
}

export const initialPopulation = async () => {
  // @ts-ignore
  const client = await clientPromise;
  const db = client.db("intelligent-scheduler");

  let data = await db.collection("teams").deleteMany({});

  for (let i = 0; i < teams.length; i++) {
    let myTeam = await db
      .collection("teams")
      .insertOne({ ...teams[i], slug: createSlug(teams[i].team_name) });
  }
};
