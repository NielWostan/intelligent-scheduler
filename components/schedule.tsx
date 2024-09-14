"use client";

import { useChat } from "ai/react";
import OpenAI from "openai";
import { useEffect, useState } from "react";

export default function Schedule({ allGames }: any) {
  const [message, setMessage] = useState("hello there");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const [currentWeek, setCurrentWeek] = useState(1);

  const handleSendMessage = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      setResponse(data.reply);
      console.log(data);
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
          onClick={handleSendMessage}
        >
          Generate Schedule
        </button>
      </div>
      <div className="border border-black m-2 p-2 h-full">
        Schedule goes here
      </div>
    </div>
  );
}
