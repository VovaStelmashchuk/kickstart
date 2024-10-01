import { Database } from '../database/client.js';

function getYear(yearName) {
  return Database.collection('f1data')
    .findOne({ year: yearName })
}

async function yearHandler(request, h) {
  const yearName = request.params.year;

  const races = (await getYear(yearName)).races;

  const uiRaces = [];

  races.forEach(race => {
    uiRaces.push({
      name: race.name,
      slug: race.slug,
      year: yearName,
    });
  });

  return h.view(
    'races_wrapper',
    {
      races: uiRaces,
    },
    {
      layout: false
    }
  )
}

export function races(server) {
  server.route({
    method: 'GET',
    path: '/races/{year}',
    handler: yearHandler,
  });
}

