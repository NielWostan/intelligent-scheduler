"use client";

import { useState } from "react";

export default function AddTeam() {
  const [newTeam, setNewTeam] = useState({
    team_name: "",
    division: "",
    day_constraint_1: "",
    day_constraint_2: "",
    time_preference: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<any>(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTeam({ ...newTeam, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage("");

    try {
      const response = await fetch("/api/add-team", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ updatedTeam: newTeam }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage("Team added successfully!");
        setNewTeam({
          team_name: "",
          division: "",
          day_constraint_1: "",
          day_constraint_2: "",
          time_preference: "",
        });
        window.alert("Team added successfully.");
      } else {
        setError(result.error || "Something went wrong.");
        window.alert("An error occurred. Please try again.");
      }
    } catch (error) {
      setError("Error adding team. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-full p-8 w-3/4 mx-auto bg-white">
      <div className="flex flex-col space-y-4 h-full">
        <h2 className="text-2xl font-semibold">Add New Team</h2>

        {/* Editable Form */}
        <div className="flex flex-col flex-grow">
          <label className="block text-gray-700 mb-2">Team Name</label>
          <input
            type="text"
            name="team_name"
            value={newTeam.team_name}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded"
          />
        </div>

        <div className="flex flex-col flex-grow">
          <label className="block text-gray-700 mb-2">Division</label>
          <input
            type="text"
            name="division"
            value={newTeam.division}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded"
          />
        </div>

        <div className="flex flex-col flex-grow">
          <label className="block text-gray-700 mb-2">Day Constraint 1</label>
          <input
            type="text"
            name="day_constraint_1"
            value={newTeam.day_constraint_1}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded"
          />
        </div>

        <div className="flex flex-col flex-grow">
          <label className="block text-gray-700 mb-2">Day Constraint 2</label>
          <input
            type="text"
            name="day_constraint_2"
            value={newTeam.day_constraint_2}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded"
          />
        </div>

        <div className="flex flex-col flex-grow">
          <label className="block text-gray-700 mb-2">Time Preference</label>
          <input
            type="text"
            name="time_preference"
            value={newTeam.time_preference}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded"
          />
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="w-full px-4 py-4 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
