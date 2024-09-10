import { Database } from '../database/client.js';

function getWinner(winnerName) {
    return Database.collection('f1data')
      .findOne({ winner: winnerName })
  }

  async function winnerHandler(request, h) {
    const winnerName = request.params.winner;
  
    const winners = (await getWinner(winnerName)).winners;
  
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
  
  export function races(server) {
    server.route({
      method: 'GET',
      path: '/winners/{winner}',
      handler: winnerHandler,
    });
  }
  