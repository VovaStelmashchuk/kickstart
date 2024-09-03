import { Database } from '../database/client.js';

function getYears(yearSort) {
  return Database.collection('f1data')
    .find()
    .sort({ year: yearSort })
    .toArray();
}

async function homeHandler(request, h) {
  const years = await getYears(-1);

  const uiYears = [];

  years.forEach(year => {
    uiYears.push({
      name: year.year
    });
  });

  return h.view('home', {
    sortUrl: '/years?sort=-1',
    sortButtonTitle: 'From newest to oldest',
    years: uiYears
  }, { layout: 'layout' });
}

async function yearHandler(request, h) {
  const yearSortQuery = request.query.sort;
  const cards = await getYears(yearSortQuery);

  const uiCards = cards.map(card => {
    return {
      name: card.year
    };
  });

  let nextSort;
  if (yearSortQuery === '-1') {
    nextSort = '1';
  } else {
    nextSort = '-1';
  }

  let titleSort;
  if (yearSortQuery === '-1') {
    titleSort = 'From oldest to newest';
  }
  if (yearSortQuery === '1') {
    titleSort = 'From newest to oldest';
  }

  return h.view('years', {
    sortUrl: `/years?sort=${nextSort}`,
    sortButtonTitle: titleSort,
    years: uiCards
  }, { layout: false });
}

export function home(server) {
  server.route({
    method: 'GET',
    path: '/',
    handler: homeHandler,
  });

  server.route({
    method: 'GET',
    path: '/years',
    handler: yearHandler,
  });
}

