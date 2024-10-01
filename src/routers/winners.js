import { Database } from '../database/client.js';

function getYear(year) {
  return Database.collection('f1data')
    .findOne({ year: year })
}

async function winnerHandler(request, h) {
  const year = request.params.year;
  const race = request.params.race;

  const yearData = await getYear(year);
  const raceData = yearData.races.find(r => r.slug === race);

  const winners = raceData.winner;

  console.log("winners ", winners);

  const uiWinners = [];

  winners.forEach(winner => {
    uiWinners.push({
      name: winner,
    });
  });

  return h.view(
    'winners_wrapper',
    {
      winners: uiWinners,
    },
    {
      layout: false
    }
  )
}

export function winners(server) {
  server.route({
    method: 'GET',
    path: '/winners/{year}/{race}',
    handler: winnerHandler,
  });
}

