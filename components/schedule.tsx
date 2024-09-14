"use client";

import { useChat } from "ai/react";
import OpenAI from "openai";
import { useEffect, useState } from "react";
import CalendarGrid from "./calendar-grid";
import { schedule } from "@/_data/_test-week";

export default function Schedule({ allGames }: any) {
  const [response, setResponse] = useState<any>([
    { week: 1, games: [] },
    { week: 2, games: [] },
    { week: 3, games: [] },
    { week: 4, games: [] },
    { week: 5, games: [] },
    { week: 6, games: [] },
    { week: 7, games: [] },
    { week: 8, games: [] },
    { week: 9, games: [] },
    { week: 10, games: [] },
  ]);
  const [loading, setLoading] = useState(false);
  const [currentWeek, setCurrentWeek] = useState(1);

  const prompt =
    `You are the scheduler of soccer games. You have 60+ teams under you and 10 divisions. The matchmaking has been done for you. You will be given an array of objects. Each object would have the following format:
  {
        teamA: “First team”,
        teamB: “”Second team,
        division: “Men's A”,
        dayConstraint1: “Monday”,
        dayConstraint2: null,
        dayConstraint3: “Tuesday”,
        dayConstraint4: null,
        timePreference1: late,
        timePreference2: middle,
};
Each of these objects represent a game that needs to be scheduled in a particular week. The possible days a game can be scheduled in Monday, Tuesday, Wednesday, Thursday, and Friday. And the available time slots are 6:00, 7:00, 8:00, 9:00, 10:00, and 11:00. So, there can be a maximum of 30 games per week. Absolutely make sure that multiple games are not scheduled for the same day and time. This holds true across all divisions. You are allowed to compromise the constraints or preferences provided that there is the other time slot is already taken. I want you to schedule all the games (from the array of objects) into the week. Each game has specific constraints and preferences, dayConstraint1, dayConstraint2, dayConstraint3, dayConstraint4 are the constraints for the days and represent the days of which that particular game cannot be scheduled. timePreference1, and timePreference2 are the preferences for the time. The value of the time preference can be early, middle or late. Early means that the game should ideally be scheduled at 6:00, 7:00, or 8:00. Middle means 7:00, 8:00, 9:00, 10:00. And late would be 9:00, 10:00, and 11:00. Try to adhere to these constraints and preferences as much as you can. But if you have to make a compromise, do it intelligently, making it fair for both teams involved. Return an array of objects that has all the key value pairs as above, and in addition to that, also have 3 more keys, scheduledDay, scheduledTime, and isCompromised. scheduledDay is on what day the game is scheduled, that is, Monday, Tuesday, Wednesday, Thursday, or Friday. Scheduled time is the exact time at which the game is scheduled, that is, 6:00, 7:00, 8:00, 9:00, 10:00, or 11:00. Again, make sure no two games are scheduled on the same day and time. So effectively, the scheduledDay and scheduledTime pairs will be unique across ALL games. This is a must, NO TWO GAMES SCHEDULED FOR THE SAME DAY AND TIME. If at any point, the scheduledDay and scheduledTime are both equal for two games, re do the second one. Only return an array of objects in the specified format with the scheduled data for all the games. Do not give any text with it. This is the data for all the games. There are ${allGames[currentWeek - 1].games.length} games, schedule all of them in a week: ` +
    JSON.stringify(allGames[currentWeek - 1].games);

  const handleSendMessage = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: prompt }),
      });

      const data = await res.json();
      setResponse((prev: any) => {
        return prev.map((item: any) => {
          if (item.week == currentWeek) {
            return { ...item, games: JSON.parse(data.reply) }; // Update the games for the correct week
          }
          return item; // Keep other weeks unchanged
        });
      });
    } catch (error) {
      console.error("Error:", error);
      setResponse("Something went wrong.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col border border-black h-4/5 overflow-y-auto">
      <div className="flex flex-row m-2 border border-black">
        <div className="flex flex-row w-4/5 justify-between">
          <button
            className="border border-black w-6"
            onClick={() => setCurrentWeek((prev) => prev - 1)}
            disabled={currentWeek <= 1}
          >
            {"<"}
          </button>
          <p className="flex items-center">Week {currentWeek}</p>
          <button
            className="border border-black w-6"
            onClick={() => setCurrentWeek((prev) => prev + 1)}
            disabled={currentWeek >= 10}
          >
            {">"}
          </button>
        </div>
        <button
          className="border border-black w-1/5"
          // onClick={handleSendMessage}
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
