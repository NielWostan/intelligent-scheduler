import React from "react";

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
                    {game.teamA} vs {game.teamB}
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
    <div className="flex flex-col w-1/2 border border-black h-full overflow-auto">
      {printGames(allGames)}
    </div>
  );
}
