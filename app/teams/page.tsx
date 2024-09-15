import Header from "@/components/header";
import TeamCard from "@/components/team-card"; // Modify this component to use divs instead of table rows
import { createClient } from "@/utils/supabase/server";

export default async function Page() {
  const supabase = createClient();
  const { data: teams, error } = await supabase.from("teams").select("*");

  if (error) {
    return <div className="text-center text-red-500">Error loading teams</div>;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />
      <div className="flex flex-col h-4/5 w-full">
        {/* Added mb-8 here */}
        <div className="flex flex-col bg-white">
          {/* Table Header */}
          <div className="flex bg-gray-200 font-semibold text-gray-700 rounded-t-lg">
            {/* Increased width for Team Name */}
            <div className="w-1/4 p-4 border-r border-gray-300">Team Name</div>
            <div className="w-1/5 p-4 border-r border-gray-300">Division</div>
            <div className="w-1/5 p-4 border-r border-gray-300">
              Day Constraint 1
            </div>
            <div className="w-1/5 p-4 border-r border-gray-300">
              Day Constraint 2
            </div>
            <div className="w-1/5 p-4 border-r border-gray-300">
              Time Preference
            </div>
            {/* Reduced width for Actions */}
            <div className="w-1/6 p-4">Actions</div>
          </div>

          {/* Table Rows */}
          {teams ? (
            teams.map((item, index) => <TeamCard key={index} item={item} />)
          ) : (
            <div className="p-4 text-center">Loading teams...</div>
          )}
        </div>
      </div>
    </div>
  );
}
