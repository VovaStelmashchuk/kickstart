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

async function login(request, h) {
  const { username, password } = request.payload;
  console.log('login information start');
  console.log(username, password);
  console.log('login information end');
  return h.view('login', {}, { layout: 'layout' });
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

  server.route({
    method: 'POST',
    path: '/login',
    handler: login,
    options: {
      auth: false
    }
  });
}

