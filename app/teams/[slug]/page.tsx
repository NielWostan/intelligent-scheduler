import Header from "@/components/header";
import TeamDashboard from "@/components/team-dashboard";
import { createClient } from "@/utils/supabase/server";

export default async function Page({ params }: any) {
  const supabase = createClient();
  const { data: teams } = await supabase
    .from("teams")
    .select("*")
    .eq("id", params.slug);

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="h-4/5">
        <TeamDashboard team={teams ? teams[0] : {}} />
      </div>
    </div>
  );
}
