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
          <div className="mb-4">
            <p>Week {weeks.week}</p>
            {weeks.games.map((game: any, index: number) => {
              return (
                <>
                  <p>
                    {getStringAfterPipe(game.division)}: {game.teamA} vs{" "}
                    {game.teamB}
                  </p>
                </>
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
    <div className="flex flex-col w-2/5 border border-black h-full overflow-auto">
      {printGames(allGames)}
    </div>
  );
}
