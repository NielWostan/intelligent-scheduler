// components/CalendarGrid.js
import React from "react";

const CalendarGrid = ({ weekgames, schedule }: any) => {
  // Days of the week (excluding weekends)
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  // Time slots on the Y-axis
  const timeSlots = ["6:00", "7:00", "8:00", "9:00", "10:00", "11:00"];

  return (
    <div className="flex justify-between border">
      <div className="grid grid-cols-6 gap-4 w-full">
        {/* Top-left empty corner */}
        <div className="p-6"></div>

        {/* Render weekdays headers */}
        {days.map((day, index) => (
          <div
            key={index}
            className="flex border border-black justify-center items-center h-12"
          >
            {day}
          </div>
        ))}

        {/* Render time slots and corresponding empty boxes */}
        {timeSlots.map((timeSlot, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {/* Time slot in the first column */}
            <div className="flex border border-black justify-center items-center h-12">
              {timeSlot}
            </div>

            {/* Empty boxes for each weekday */}
            {days.map((day, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="flex border border-black justify-center items-center h-12 hover:bg-gray-200 cursor-pointer"
              >
                {schedule?.filter(
                  (item: any) =>
                    item.scheduledDay == day && item.scheduledTime == timeSlot
                ).length > 0
                  ? schedule.filter(
                      (item: any) =>
                        item.scheduledDay == day &&
                        item.scheduledTime == timeSlot
                    )[0].teamA
                  : ""}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;
