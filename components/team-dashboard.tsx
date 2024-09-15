"use client";

import { useState } from "react";

interface Team {
  id: number;
  team_name: string;
  division: string;
  day_constraint_1: string;
  day_constraint_2: string;
  time_preference: string;
}

interface TeamDashboardProps {
  team: Team;
}

export default function TeamDashboard({ team }: TeamDashboardProps) {
  const [updatedTeam, setUpdatedTeam] = useState(team);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedTeam({ ...updatedTeam, [name]: value });
  };

  const handleSave = async () => {
    try {
      const res = await fetch("/api/updateTeam", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ updatedTeam }),
      });

      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col h-full p-8 w-3/4 mx-auto bg-white">
      <div className="flex flex-col space-y-4 h-full">
        <h2 className="text-2xl font-semibold">Edit Team Information</h2>

        {/* Editable Form */}
        <div className="flex flex-col flex-grow">
          <label className="block text-gray-700 mb-2">Team Name</label>
          <input
            type="text"
            name="team_name"
            value={updatedTeam.team_name}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded"
          />
        </div>

        <div className="flex flex-col flex-grow">
          <label className="block text-gray-700 mb-2">Division</label>
          <input
            type="text"
            name="division"
            value={updatedTeam.division}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded"
          />
        </div>

        <div className="flex flex-col flex-grow">
          <label className="block text-gray-700 mb-2">Day Constraint 1</label>
          <input
            type="text"
            name="day_constraint_1"
            value={updatedTeam.day_constraint_1}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded"
          />
        </div>

        <div className="flex flex-col flex-grow">
          <label className="block text-gray-700 mb-2">Day Constraint 2</label>
          <input
            type="text"
            name="day_constraint_2"
            value={updatedTeam.day_constraint_2}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded"
          />
        </div>

        <div className="flex flex-col flex-grow">
          <label className="block text-gray-700 mb-2">Time Preference</label>
          <input
            type="text"
            name="time_preference"
            value={updatedTeam.time_preference}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded"
          />
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="w-full px-4 py-4 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
