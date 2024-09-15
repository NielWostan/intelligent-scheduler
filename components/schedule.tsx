"use client";

import { useState } from "react";
import CalendarGrid from "./calendar-grid";
import { schedule } from "@/_data/_test-week";

interface ScheduleProps {
  allGames: any;
  currentWeek: number;
  setCurrentWeek: (week: number) => void;
  response: any;
  setResponse: (response: any) => void;
  handleSendMessage: () => void;
}

export default function Schedule({
  allGames,
  currentWeek,
  setCurrentWeek,
  response,
  handleSendMessage,
}: ScheduleProps) {
  return (
    <div className="flex flex-col h-4/5 bg-white px-6 justify-evenly">
      {/* Header Section */}
      <div className="flex flex-row justify-center">
        <div className="flex flex-row w-4/5 justify-between items-center">
          {/* Previous Week Button */}
          <button
            className={`w-6 ${
              currentWeek <= 1
                ? "bg-gray-300 cursor-not-allowed"
                : "hover:bg-gray-200"
            }`}
            onClick={() => setCurrentWeek(currentWeek - 1)}
            disabled={currentWeek <= 1}
          >
            {"<"}
          </button>

          {/* Current Week Display */}
          <p className="flex items-center text-lg font-semibold">
            Week {currentWeek}
          </p>

          {/* Next Week Button */}
          <button
            className={` w-6 ${
              currentWeek >= 10
                ? "bg-gray-300 cursor-not-allowed"
                : "hover:bg-gray-200"
            }`}
            onClick={() => setCurrentWeek(currentWeek + 1)}
            disabled={currentWeek >= 10}
          >
            {">"}
          </button>
        </div>

        {/* Generate Schedule Button */}
        <button
          className="w-1/5 text-black transition p-2 border border-black rounded-lg ml-8"
          onClick={handleSendMessage}
        >
          Generate
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="">
        {allGames[currentWeek - 1] && response.length > 0 ? (
          <CalendarGrid
            weekgames={allGames[currentWeek - 1]}
            schedule={
              response.filter((item: any) => item.week === currentWeek)[0]
                ?.games || []
            }
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">No games scheduled for this week.</p>
          </div>
        )}
      </div>
    </div>
  );
}
