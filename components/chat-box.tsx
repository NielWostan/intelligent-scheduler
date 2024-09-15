"use client";

import React, { useState } from "react";

export default function ChatBox({
  currentWeek,
  updateText,
  setUpdateText,
  handleUpdateMessage,
  hasGeneratedSchedule,
}: any) {
  return (
    <div className="flex flex-row h-1/5">
      <textarea
        className="border border-black h-full grow flex p-4 outline-none resize-none"
        placeholder="Chat with OpenAI here..."
        value={updateText}
        onChange={(e) => setUpdateText(e.target.value)}
        disabled={!hasGeneratedSchedule}
      ></textarea>
      <button
        className="flex w-32 items-center justify-center"
        onClick={handleUpdateMessage}
        disabled={!hasGeneratedSchedule}
      >
        Send
      </button>
    </div>
  );
}
