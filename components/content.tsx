import ChatBox from "@/components/chat-box";
import Games from "@/components/games";
import Schedule from "@/components/schedule";
import { formatGames } from "@/tools/format-games";
import { scheduleEven } from "@/tools/schedule-even";
import { scheduleOdd } from "@/tools/schedule-odd";
import { createClient } from "@/utils/supabase/server";

export default async function Content() {
  const supabase = createClient();
  const { data: teams } = await supabase.from("teams").select("*");

  const mensA = teams?.filter(
    (team) => team.division == "Summer Men's 24 | Summer Men's A Division"
  );
  const mensB = teams?.filter(
    (team) => team.division == "Summer Men's 24 | Summer Men's B Division"
  );
  const mensC = teams?.filter(
    (team) => team.division == "Summer Men's 24 | Summer Men's C Division"
  );
  const mensD = teams?.filter(
    (team) => team.division == "Summer Men's 24 | Summer Men's D Division"
  );
  const mensE = teams?.filter(
    (team) => team.division == "Summer Men's 24 | Summer Men's E Division"
  );

  const coedA = teams?.filter(
    (team) => team.division == "Summer Co-Ed 24 | Co-Ed A Division"
  );
  const coedB = teams?.filter(
    (team) => team.division == "Summer Co-Ed 24 | Co-Ed B Division"
  );
  const coedC = teams?.filter(
    (team) => team.division == "Summer Co-Ed 24 | Co-Ed C Division"
  );
  const coedD = teams?.filter(
    (team) => team.division == "Summer Co-Ed 24 | Co-Ed D Division"
  );
  const coedE = teams?.filter(
    (team) => team.division == "Summer Co-Ed 24 | Co-Ed E Division"
  );

  let mensAGames: any,
    mensBGames: any,
    mensCGames: any,
    mensDGames: any,
    mensEGames: any,
    coedAGames: any,
    coedBGames: any,
    coedCGames: any,
    coedDGames: any,
    coedEGames: any;

  let allGames: any[] = [
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

  if (mensA?.length ? mensA?.length % 2 == 0 : null) {
    mensAGames = scheduleEven(mensA);
  } else mensAGames = scheduleOdd(mensA);

  if (mensB?.length ? mensB?.length % 2 == 0 : null) {
    mensBGames = scheduleEven(mensB);
  } else mensBGames = scheduleOdd(mensB);

  if (mensC?.length ? mensC?.length % 2 == 0 : null) {
    mensCGames = scheduleEven(mensC);
  } else mensCGames = scheduleOdd(mensC);

  if (mensD?.length ? mensD?.length % 2 == 0 : null) {
    mensDGames = scheduleEven(mensD);
  } else mensDGames = scheduleOdd(mensD);

  if (mensE?.length ? mensE?.length % 2 == 0 : null) {
    mensEGames = scheduleEven(mensE);
  } else mensEGames = scheduleOdd(mensE);

  if (coedA?.length ? coedA?.length % 2 == 0 : null) {
    coedAGames = scheduleEven(coedA);
  } else coedAGames = scheduleOdd(coedA);

  if (coedB?.length ? coedB?.length % 2 == 0 : null) {
    coedBGames = scheduleEven(coedB);
  } else coedBGames = scheduleOdd(coedB);

  if (coedC?.length ? coedC?.length % 2 == 0 : null) {
    coedCGames = scheduleEven(coedC);
  } else coedCGames = scheduleOdd(coedC);

  if (coedD?.length ? coedD?.length % 2 == 0 : null) {
    coedDGames = scheduleEven(coedD);
  } else coedDGames = scheduleOdd(coedD);

  if (coedE?.length ? coedE?.length % 2 == 0 : null) {
    coedEGames = scheduleEven(coedE);
  } else coedEGames = scheduleOdd(coedE);

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < mensAGames[i].length; j++) {
      allGames[i].games.push(mensAGames[i][j]);
    }
    for (let j = 0; j < mensBGames[i].length; j++) {
      allGames[i].games.push(mensBGames[i][j]);
    }
    for (let j = 0; j < mensCGames[i].length; j++) {
      allGames[i].games.push(mensCGames[i][j]);
    }
    for (let j = 0; j < mensDGames[i].length; j++) {
      allGames[i].games.push(mensDGames[i][j]);
    }
    for (let j = 0; j < mensEGames[i].length; j++) {
      allGames[i].games.push(mensEGames[i][j]);
    }
    for (let j = 0; j < coedAGames[i].length; j++) {
      allGames[i].games.push(coedAGames[i][j]);
    }
    for (let j = 0; j < coedBGames[i].length; j++) {
      allGames[i].games.push(coedBGames[i][j]);
    }
    for (let j = 0; j < coedCGames[i].length; j++) {
      allGames[i].games.push(coedCGames[i][j]);
    }
    for (let j = 0; j < coedDGames[i].length; j++) {
      allGames[i].games.push(coedDGames[i][j]);
    }
    for (let j = 0; j < coedEGames[i].length; j++) {
      allGames[i].games.push(coedEGames[i][j]);
    }
  }

  const formattedGames = formatGames(allGames);

  return (
    <>
      <Games allGames={formattedGames} />
      <div className="flex flex-col h-full w-1/2">
        <Schedule allGames={formattedGames} />
        <ChatBox />
      </div>
    </>
  );
}
