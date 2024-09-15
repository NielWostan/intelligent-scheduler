import { createSlug } from "@/tools/create-slug";
import { teams } from "../_data/_teams";
// @ts-ignore
import clientPromise from "../lib/mongodb";

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
