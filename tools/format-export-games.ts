export function formatExportGames(schedule: any) {
  let formattedGames: any[] = [];

  for (let i = 0; i < schedule.length; i++) {
    for (let j = 0; j < schedule[i].games.length; j++) {
      const match = {
        team_a: schedule[i].games[j].teamA,
        team_b: schedule[i].games[j].teamB,
        division: schedule[i].games[j].division,
        day_constraint_1: schedule[i].games[j].dayConstraint1,
        day_constraint_2: schedule[i].games[j].dayConstraint2,
        day_constraint_3: schedule[i].games[j].dayConstraint3,
        day_constraint_4: schedule[i].games[j].dayConstraint4,
        time_preference_1: schedule[i].games[j].timePreference1,
        time_preference_2: schedule[i].games[j].timePreference2,
        scheduled_day: schedule[i].games[j].scheduledDay,
        scheduled_time: schedule[i].games[j].scheduledTime,
        week: i + 1,
        is_compromised: schedule[i].games[j].isCompromised,
      };
      formattedGames.push(match);
    }
  }

  return formattedGames;
}
