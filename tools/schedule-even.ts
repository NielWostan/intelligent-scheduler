export const scheduleEven = (teams: any) => {
  const totalRounds = 10;
  const uniqueRounds = teams.length - 1;
  const halfSize = teams.length / 2;
  const schedule = [];

  const initialSchedule = [];
  for (let round = 0; round < uniqueRounds; round++) {
    const roundPairings = [];

    for (let i = 0; i < halfSize; i++) {
      const home = teams[i];
      const away = teams[teams.length - 1 - i];
      roundPairings.push([home, away]);
    }

    initialSchedule.push(roundPairings);

    teams.splice(1, 0, teams.pop());
  }

  while (schedule.length < totalRounds) {
    for (let round of initialSchedule) {
      if (schedule.length < totalRounds) {
        schedule.push(round);
      }
    }
  }

  return schedule;
};
