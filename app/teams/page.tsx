import Header from "@/components/header";
import TeamCard from "@/components/team-card"; // Modify this component to use divs instead of table rows
import { createClient } from "@/utils/supabase/server";

export default async function Page() {
  const supabase = createClient();
  const { data: teams, error } = await supabase.from("teams").select("*");

  if (error) {
    return <div>Error loading teams</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-col h-4/5 w-full">
        <div className="flex flex-col border border-black">
          {/* Table Header */}
          <div className="flex bg-gray-200">
            <div className="w-1/5 p-4 border-r border-black">Team Name</div>
            <div className="w-1/5 p-4 border-r border-black">Division</div>
            <div className="w-1/5 p-4 border-r border-black">
              Day Constraint 1
            </div>
            <div className="w-1/5 p-4 border-r border-black">
              Day Constraint 2
            </div>
            <div className="w-1/5 p-4 border-r border-black">
              Time Preference
            </div>
            <div className="w-1/5 p-4 border-black"></div>
          </div>

          {/* Table Rows */}
          {teams ? (
            teams.map((item, index) => <TeamCard key={index} item={item} />)
          ) : (
            <div className="p-4">Loading teams...</div>
          )}
        </div>
      </div>
    </div>
  );
}
