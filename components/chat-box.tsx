"use client";

import React from "react";

export default function ChatBox({
  currentWeek,
  updateText,
  setUpdateText,
  handleUpdateMessage,
  hasGeneratedSchedule,
}: any) {
  return (
    <div className="flex flex-row h-1/5 bg-gray-100 p-4">
      {/* Chat Text Area */}
      <textarea
        className={`border border-gray-300 h-full grow flex p-4 outline-none resize-none rounded-lg ${
          hasGeneratedSchedule ? "bg-white" : "bg-gray-200 cursor-not-allowed"
        }`}
        placeholder="Chat with OpenAI here..."
        value={updateText}
        onChange={(e) => setUpdateText(e.target.value)}
        disabled={!hasGeneratedSchedule}
      ></textarea>

      {/* Send Button */}
      <button
        className={`flex w-32 ml-4 items-center justify-center bg-blue-500 text-white font-semibold rounded-lg transition duration-300 ${
          hasGeneratedSchedule
            ? "hover:bg-blue-600 active:bg-blue-700"
            : "bg-gray-300 cursor-not-allowed"
        }`}
        onClick={handleUpdateMessage}
        disabled={!hasGeneratedSchedule}
      >
        Send
      </button>
    </div>
  );
}
