import { getCards } from "../database/cards-repository.js";

async function homeHandler(request, h) {
  const cards = await getCards();

  const uiCards = cards.map(card => {
    return {
      title: card.title,
      description: card.count,
    };
  });
  return h.view('home', { cards: uiCards }, { layout: 'layout' });
}

export function home(server) {
  server.route({
    method: 'GET',
    path: '/',
    handler: homeHandler,
    options: {
      auth: false
    }
  });
}

