export const scheduleOdd = (teams: any) => {
  const totalRounds = 10;
  const schedule = [];
  const teamsCount = teams.length;
  let lastTeamPlayedDouble: any = null;

  const matchesPlayed: any = {};

  teams.forEach((team: any) => {
    matchesPlayed[team] = {};
    teams.forEach((opponent: any) => {
      if (team !== opponent) {
        matchesPlayed[team][opponent] = false;
      }
    });
  });

  function findOpponent(team: any, possibleOpponents: any) {
    for (let opponent of possibleOpponents) {
      if (!matchesPlayed[team][opponent]) {
        return opponent;
      }
    }
    return possibleOpponents[0];
  }

  for (let round = 1; round <= totalRounds; round++) {
    const roundMatches = [];

    if (round % 2 !== 0) {
      let doubleGameTeam = teams[(round - 1) % teamsCount];

      let otherTeams = teams.filter((team: any) => team !== doubleGameTeam);

      let opponent1 = findOpponent(doubleGameTeam, otherTeams);
      let opponent2 = findOpponent(
        doubleGameTeam,
        otherTeams.filter((t: any) => t !== opponent1)
      );

      roundMatches.push(`${doubleGameTeam} vs ${opponent1}`);
      roundMatches.push(`${doubleGameTeam} vs ${opponent2}`);

      matchesPlayed[doubleGameTeam][opponent1] = true;
      matchesPlayed[doubleGameTeam][opponent2] = true;
      matchesPlayed[opponent1][doubleGameTeam] = true;
      matchesPlayed[opponent2][doubleGameTeam] = true;

      otherTeams = otherTeams.filter(
        (team: any) => team !== opponent1 && team !== opponent2
      );
      while (otherTeams.length > 1) {
        let team1 = otherTeams[0];
        let team2 = findOpponent(team1, otherTeams.slice(1));
        roundMatches.push(`${team1} vs ${team2}`);

        matchesPlayed[team1][team2] = true;
        matchesPlayed[team2][team1] = true;

        otherTeams = otherTeams.filter(
          (team: any) => team !== team1 && team !== team2
        );
      }

      lastTeamPlayedDouble = doubleGameTeam;
    } else {
      let otherTeams = teams.filter(
        (team: any) => team !== lastTeamPlayedDouble
      );

      while (otherTeams.length > 1) {
        let team1 = otherTeams[0];
        let team2 = findOpponent(team1, otherTeams.slice(1));
        roundMatches.push(`${team1} vs ${team2}`);

        matchesPlayed[team1][team2] = true;
        matchesPlayed[team2][team1] = true;

        otherTeams = otherTeams.filter(
          (team: any) => team !== team1 && team !== team2
        );
      }
    }

    schedule.push({ round: round, matches: roundMatches });
  }

  return schedule;
};
