export function formatGames(schedule: any) {
  let formattedGames: any[] = [
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
  ];

  for (let i = 0; i < schedule.length; i++) {
    for (let j = 0; j < schedule[i].games.length; j++) {
      const match = {
        teamA: schedule[i].games[j][0]?.team_name,
        teamB: schedule[i].games[j][1]?.team_name,
        division: schedule[i].games[j][0]?.division,
        dayConstraint1: schedule[i].games[j][0]?.day_constraint_1,
        dayConstraint2: schedule[i].games[j][1]?.day_constraint_1,
        dayConstraint3: schedule[i].games[j][0]?.day_constraint_2,
        dayConstraint4: schedule[i].games[j][1]?.day_constraint_2,
        timePreference1: schedule[i].games[j][0]?.time_preference,
        timePreference2: schedule[i].games[j][1]?.time_preference,
      };
      formattedGames[i].games.push(match);
    }
  }

  return formattedGames;
}
