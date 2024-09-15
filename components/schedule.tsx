"use client";

import { useState } from "react";
import CalendarGrid from "./calendar-grid";
import { schedule } from "@/_data/_test-week";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";

interface ScheduleProps {
  allGames: any;
  currentWeek: number;
  setCurrentWeek: (week: number) => void;
  response: any;
  setResponse: (response: any) => void;
  handleSendMessage: () => void;
  loading: boolean;
  exportData: () => void;
  exporting: boolean;
  updateText: string;
  setUpdateText: (text: string) => void;
  handleRestart: () => void;
}

export default function Schedule({
  allGames,
  currentWeek,
  setCurrentWeek,
  response,
  handleSendMessage,
  loading,
  exportData,
  exporting,
  updateText,
  setUpdateText,
  handleRestart,
}: ScheduleProps) {
  return (
    <div
      className={`flex flex-col h-4/5 bg-white px-6 justify-evenly ${loading || exporting ? "opacity-50" : ""}`}
    >
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
            onClick={() => {
              setCurrentWeek(currentWeek - 1);
              setUpdateText("");
            }}
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
            onClick={() => {
              setCurrentWeek(currentWeek + 1);
              setUpdateText("");
            }}
            disabled={currentWeek >= 10}
          >
            {">"}
          </button>
        </div>

        {/* Generate Schedule Button */}
        <button
          className={`w-1/5 text-black transition p-2 border border-black rounded-lg ml-4 mr-2 ${loading ? "cursor-not-allowed" : ""}`}
          onClick={handleSendMessage}
        >
          {!loading ? (
            <p>Generate</p>
          ) : (
            <p>
              Generating
              <span className="relative after:content-['...'] h-[30px] after:absolute after:top-0 after:left-0 after:animate-dots"></span>
            </p>
          )}
        </button>

        {/* Export Button */}
        <button
          className={`w-1/5 text-black transition bg-blue-500 text-white p-2 rounded hover:bg-blue-700 rounded-lg mx-2 ${loading ? "hover:bg-blue-500 cursor-not-allowed" : ""}`}
          onClick={exportData}
          disabled={loading}
        >
          {!exporting ? (
            <p>Export</p>
          ) : (
            <p>
              Exporting
              <span className="relative after:content-['...'] h-[30px] after:absolute after:top-0 after:left-0 after:animate-dots"></span>
            </p>
          )}
        </button>

        {/* Restart Button */}
        <button
          className={`w-min flex items-center justify-center justify-center text-black transition bg-gray-500 text-white p-2 rounded hover:bg-gray-700 rounded-lg mx-auto px-auto ${loading ? "hover:bg-gray-500 cursor-not-allowed" : ""}`}
          onClick={handleRestart}
          disabled={loading}
        >
          <FontAwesomeIcon icon={faArrowRotateRight} className="mx-2" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="">
        {allGames[currentWeek - 1] && response.length > 0 ? (
          <CalendarGrid
            weekgames={allGames[currentWeek - 1]}
            schedule={
              response.filter((item: any) => item?.week === currentWeek)[0]
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
