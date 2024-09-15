export function parseExportGames(formattedGames: any) {
  // Initialize the schedule with 10 weeks, each with an empty games array
  let schedule: any[] = Array.from({ length: 10 }, (_, index) => ({
    week: index + 1,
    games: [],
  }));

  // Iterate over formattedGames and add them to the appropriate week
  formattedGames.forEach((match: any) => {
    // Ensure week index is within bounds (1 to 10)
    if (match.week >= 1 && match.week <= 10) {
      // Find the corresponding week (1-based index, so subtract 1)
      const weekIndex = match.week - 1;

      // Create the game object
      const game = {
        teamA: match.team_a,
        teamB: match.team_b,
        division: match.division,
        dayConstraint1: match.day_constraint_1,
        dayConstraint2: match.day_constraint_2,
        dayConstraint3: match.day_constraint_3,
        dayConstraint4: match.day_constraint_4,
        timePreference1: match.time_preference_1,
        timePreference2: match.time_preference_2,
        scheduledDay: match.scheduled_day,
        scheduledTime: match.scheduled_time,
        isCompromised: match.is_compromised,
      };

      // Add the game to the corresponding week
      schedule[weekIndex].games.push(game);
    }
  });

  return schedule;
}
