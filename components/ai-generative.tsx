"use client";

import { formatExportGames } from "@/tools/format-export-games";
import ChatBox from "./chat-box";
import Schedule from "./schedule";
import { useState } from "react";
import { parseExportGames } from "@/tools/parse-export-games";

export default function AIGenerative({ allGames, schedule }: any) {
  const [response, setResponse] = useState<any>(
    schedule.length > 0
      ? parseExportGames(schedule)
      : [
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
        ]
  );
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [currentWeek, setCurrentWeek] = useState(1);
  const [updateText, setUpdateText] = useState("");
  const [hasGeneratedSchedule, setHasGeneratedSchedule] = useState(false);

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
    Each of these objects represent a game that needs to be scheduled in a particular week. The possible days a game can be scheduled in Monday, Tuesday, Wednesday, Thursday, and Friday. And the available time slots are 6:00, 7:00, 8:00, 9:00, 10:00, and 11:00. So, there can be a maximum of 30 games per week. Absolutely make sure that multiple games are not scheduled for the same day and time. This holds true across all divisions. You are allowed to compromise the constraints or preferences provided that there is the other time slot is already taken. I want you to schedule all the games (from the array of objects) into the week. Each game has specific constraints and preferences, dayConstraint1, dayConstraint2, dayConstraint3, dayConstraint4 are the constraints for the days and represent the days of which that particular game cannot be scheduled. timePreference1, and timePreference2 are the preferences for the time. The value of the time preference can be early, middle or late. Early means that the game should ideally be scheduled at 6:00, 7:00, or 8:00. Middle means 7:00, 8:00, 9:00, 10:00. And late would be 9:00, 10:00, and 11:00. Try to adhere to these constraints and preferences as much as you can. But if you have to make a compromise, do it intelligently, making it fair for both teams involved. Return an array of objects that has all the key value pairs as above, and in addition to that, also have 3 more keys, scheduledDay, scheduledTime, and isCompromised. scheduledDay is on what day the game is scheduled, that is, Monday, Tuesday, Wednesday, Thursday, or Friday. Scheduled time is the exact time at which the game is scheduled, that is, 6:00, 7:00, 8:00, 9:00, 10:00, or 11:00. Again, make sure no two games are scheduled on the same day and time. So effectively, the scheduledDay and scheduledTime pairs will be unique across ALL games. This is a must, NO TWO GAMES SCHEDULED FOR THE SAME DAY AND TIME. If at any point, the scheduledDay and scheduledTime are both equal for two games, re do the second one. Only return an array of objects in the specified format with the scheduled data for all the games. This is important: do not give any text with it, just the array of objects. This is the data for all the games. There are ${allGames[currentWeek - 1].games.length} games, schedule all of them in a week: ` +
    JSON.stringify(allGames[currentWeek - 1].games);

  const handleSendMessage = async () => {
    setLoading(true);
    let retryCount = 0;
    const maxRetries = 3;
    let successful = false;

    while (retryCount < maxRetries && !successful) {
      try {
        const res = await fetch("/api/openai", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: prompt }),
        });

        const data = await res.json();

        // Attempt to parse the reply as JSON
        try {
          const parsedGames = JSON.parse(data.reply.replace(/`/g, ""));

          // If parsing succeeds, update the state
          setResponse((prev: any) => {
            return prev.map((item: any) => {
              if (item.week == currentWeek) {
                return { ...item, games: parsedGames }; // Update the games for the correct week
              }
              return item; // Keep other weeks unchanged
            });
          });
          setHasGeneratedSchedule(true);
          successful = true; // Mark as successful
        } catch (parseError) {
          retryCount++;
          window.alert(
            `Error parsing JSON (Attempt ${retryCount} of ${maxRetries}): Retrying`
          );
          console.error(parseError);
        }
      } catch (error) {
        console.error("Error fetching from /api/openai:", error);
        window.alert("Something went wrong.");
        break; // If there's an error fetching the response, exit the loop
      }
    }

    if (!successful) {
      window.alert("Failed to generate a valid schedule after 3 attempts.");
    }

    setLoading(false);
  };

  const updatePrompt = `For the given data: ${JSON.stringify(response[currentWeek - 1].games)}. Perform the following task: "${updateText}". Return only an object of array. Do not return any text. Still give the complete data, keeping all the other data same`;

  const handleUpdateMessage = async () => {
    setLoading(true);
    let retryCount = 0;
    const maxRetries = 3;
    let successful = false;

    while (retryCount < maxRetries && !successful) {
      try {
        const res = await fetch("/api/openai", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: updatePrompt }),
        });

        const data = await res.json();

        // Attempt to parse the reply as JSON
        try {
          const parsedGames = JSON.parse(data.reply);

          // If parsing succeeds, update the state
          setResponse((prev: any) => {
            return prev.map((item: any) => {
              if (item.week === currentWeek) {
                return { ...item, games: parsedGames }; // Update the games for the correct week
              }
              return item; // Keep other weeks unchanged
            });
          });

          successful = true; // Mark as successful
          setUpdateText("");
        } catch (parseError) {
          retryCount++;
          window.alert(
            `Error parsing JSON (Attempt ${retryCount} of ${maxRetries}): Retrying`
          );
          console.error(parseError);
        }
      } catch (error) {
        console.error("Error fetching from /api/openai:", error);
        window.alert("Something went wrong.");
        break; // If there's an error fetching the response, exit the loop
      }
    }

    if (!successful) {
      window.alert(
        "Failed to update the schedule after 3 attempts. Please resend request."
      );
    }

    setLoading(false);
  };

  const exportData = async () => {
    setExporting(true);
    console.log(response);
    try {
      const res = await fetch("/api/exportData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ req: formatExportGames(response) }),
      });

      const data = await res.json();
      if (res.ok) {
        window.alert("Data exported successfully.");
      } else {
        window.alert("An error occurred exporting. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      window.alert("Something went wrong.");
    }
    setExporting(false);
  };

  function handleRestart() {
    setResponse((prev: any) => {
      return prev.map((item: any) => {
        if (item?.week == currentWeek) {
          return { ...item, games: [] };
        } else {
          return { ...item, week: item.week, games: item.games };
        }
      });
    });
  }

  return (
    <div className="flex flex-col h-full w-4/5">
      <Schedule
        allGames={allGames}
        currentWeek={currentWeek}
        setCurrentWeek={setCurrentWeek}
        response={response}
        setResponse={setResponse}
        handleSendMessage={handleSendMessage}
        loading={loading}
        exportData={exportData}
        exporting={exporting}
        updateText={updateText}
        setUpdateText={setUpdateText}
        handleRestart={handleRestart}
      />
      <ChatBox
        currentWeek={currentWeek}
        updateText={updateText}
        setUpdateText={setUpdateText}
        handleUpdateMessage={handleUpdateMessage}
        hasGeneratedSchedule={response[currentWeek - 1].games.length > 0}
        loading={loading}
        exporting={exporting}
      />
    </div>
  );
}
