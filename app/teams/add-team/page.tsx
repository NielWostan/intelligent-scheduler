import AddTeam from "@/components/add-team";
import Header from "@/components/header";
import React from "react";

export default function Page() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <AddTeam />
    </div>
  );
}
