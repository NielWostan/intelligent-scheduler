import React from "react";

const CalendarGrid = ({ weekgames, schedule }: any) => {
  // Days of the week (excluding weekends)
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  // Time slots on the Y-axis
  const timeSlots = ["6:00", "7:00", "8:00", "9:00", "10:00", "11:00"];

  return (
    <div className="w-full bg-white rounded-lg">
      <div className="grid grid-cols-[auto,1fr] gap-2 w-full">
        {/* Top-left empty corner */}
        <div className="h-12 w-16"></div>{" "}
        {/* Fixed width for time slot column */}
        {/* Render weekdays headers */}
        <div className="grid grid-cols-5 gap-2">
          {days.map((day, index) => (
            <div
              key={index}
              className="flex-grow flex border border-gray-300 bg-gray-50 justify-center items-center h-12 font-semibold text-gray-800"
            >
              {day}
            </div>
          ))}
        </div>
        {/* Render time slots and corresponding empty boxes */}
        {timeSlots.map((timeSlot, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {/* Time slot in the first column */}
            <div className="flex border border-gray-300 bg-gray-100 justify-center items-center h-12 w-16 font-medium text-gray-700">
              {timeSlot}
            </div>

            {/* Empty boxes for each weekday */}
            <div className="grid grid-cols-5 gap-2">
              {days.map((day, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className="flex-grow flex border border-gray-300 justify-center items-center h-12 hover:bg-blue-100 cursor-pointer text-xs transition-all"
                >
                  {schedule?.filter(
                    (item: any) =>
                      item.scheduledDay == day && item.scheduledTime == timeSlot
                  ).length > 0 ? (
                    <p className="p-2 text-center text-gray-800">
                      {
                        schedule.filter(
                          (item: any) =>
                            item.scheduledDay == day &&
                            item.scheduledTime == timeSlot
                        )[0].teamA
                      }{" "}
                      vs{" "}
                      {
                        schedule.filter(
                          (item: any) =>
                            item.scheduledDay == day &&
                            item.scheduledTime == timeSlot
                        )[0].teamB
                      }
                    </p>
                  ) : (
                    <p className="text-gray-400">-</p> // Placeholder for empty slots
                  )}
                </div>
              ))}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;
