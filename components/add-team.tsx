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
      const response = await fetch("/api/addTeam", {
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
      } else {
        setError(result.error || "Something went wrong.");
      }
    } catch (error) {
      setError("Error adding team. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow-md w-3/4 mx-auto">
      <h2 className="text-2xl font-semibold">Add New Team</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mt-4">
        <div>
          <label className="block text-gray-700">Team Name</label>
          <input
            type="text"
            name="team_name"
            value={newTeam.team_name}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Division</label>
          <input
            type="text"
            name="division"
            value={newTeam.division}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Day Constraint 1</label>
          <input
            type="text"
            name="day_constraint_1"
            value={newTeam.day_constraint_1}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block text-gray-700">Day Constraint 2</label>
          <input
            type="text"
            name="day_constraint_2"
            value={newTeam.day_constraint_2}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block text-gray-700">Time Preference</label>
          <input
            type="text"
            name="time_preference"
            value={newTeam.time_preference}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Adding..." : "Add Team"}
        </button>
      </form>

      {/* Success or Error Messages */}
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {successMessage && (
        <p className="text-green-500 mt-4">{successMessage}</p>
      )}
    </div>
  );
}
