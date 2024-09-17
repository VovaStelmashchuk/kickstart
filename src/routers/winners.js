import { Database } from '../database/client.js';

function getYear(year, race) {
  return Database.collection('f1data')
    .findOne({ year: year })
}

async function winnerHandler(request, h) {
  const race = request.params.race;

  const winners = (await getYear(race)).races.find(r => r.name == race).winner;

  const uiWinners = [];

  winners.forEach(winner => {
    uiWinners.push({
      name: race.winner,
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
    path: '/winners/{race}',
    handler: winnerHandler,
  });
}

