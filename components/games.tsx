import React from "react";

function getStringAfterPipe(inputString: string) {
  const indexOfPipe = inputString.indexOf("|");

  if (indexOfPipe === -1) {
    return inputString;
  }

  return inputString.substring(indexOfPipe + 1).trim();
}

function printGames(games: any) {
  return (
    <>
      {games.map((weeks: any, index: number) => {
        return (
          <div key={index} className="mb-6 p-4 bg-gray-100 shadow-md">
            <p className="text-lg font-bold text-blue-600 mb-2">
              Week {weeks.week}
            </p>
            {weeks.games.map((game: any, index: number) => {
              return (
                <div
                  key={index}
                  className="p-2 mb-2 bg-white border border-gray-200 rounded-md"
                >
                  <p className="text-gray-700 font-medium">
                    {getStringAfterPipe(game.division)}:{" "}
                    <span className="text-black">{game.teamA}</span> vs{" "}
                    <span className="text-black">{game.teamB}</span>
                  </p>
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
}

export default function Games({ allGames }: any) {
  return (
    <div className="flex flex-col w-2/5 mx-auto p-0 shadow-lg h-full overflow-auto bg-white">
      {printGames(allGames)}
    </div>
  );
}
