import { Database } from '../database/client.js';

export function getCards(yearSort = -1) {
  return Database.collection('f1data')
    .find()
    .sort({ year: yearSort })
    .toArray();
}

async function homeHandler(request, h) {
  const cards = await getCards();

  const uiCards = cards.map(card => {
    return {
      name: card.year
    };
  });

  return h.view('home', {
    sortUrl: '/years',
    sortButtonTitle: 'From newest to oldest',
    years: uiCards
  }, { layout: 'layout' });
}

async function yearHandler(request, h) {
  const yearSortQuery = request.query.sort;
  const cards = await getCards(yearSortQuery);

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

  return h.view('years', {
    sortUrl: `/years?sort=${nextSort}`,
    sortButtonTitle: 'From newest to oldest',
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

