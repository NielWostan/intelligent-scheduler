"use client";

import { useChat } from "ai/react";
import OpenAI from "openai";
import { useEffect, useState } from "react";
import CalendarGrid from "./calendar-grid";
import { schedule } from "@/_data/_test-week";

export default function Schedule({
  allGames,
  currentWeek,
  setCurrentWeek,
  response,
  setResponse,
  handleSendMessage,
}: any) {
  return (
    <div className="flex flex-col border border-black h-4/5 overflow-y-auto">
      <div className="flex flex-row m-2 border border-black">
        <div className="flex flex-row w-4/5 justify-between">
          <button
            className="border border-black w-6"
            onClick={() => setCurrentWeek((prev: any) => prev - 1)}
            disabled={currentWeek <= 1}
          >
            {"<"}
          </button>
          <p className="flex items-center">Week {currentWeek}</p>
          <button
            className="border border-black w-6"
            onClick={() => setCurrentWeek((prev: any) => prev + 1)}
            disabled={currentWeek >= 10}
          >
            {">"}
          </button>
        </div>
        <button
          className="border border-black w-1/5"
          onClick={handleSendMessage}
        >
          Generate Schedule
        </button>
      </div>
      <div className="border border-black m-2 h-full">
        <CalendarGrid
          weekgames={allGames[currentWeek - 1]}
          schedule={
            response.filter((item: any) => item.week == currentWeek)[0].games
          }
        />
      </div>
    </div>
  );
}
