import { server as _server } from '@hapi/hapi';
import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import Handlebars from "handlebars";

import { home } from './routers/home.js';
import { races } from './routers/races.js';
import { winners } from './routers/winners.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const init = async () => {
  const server = _server({
    port: 5000,
    host: '127.0.0.1',
    debug: { request: ['error'] }
  });

  await server.register(Inert);
  await server.register(Vision);

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  server.views({
    engines: { html: Handlebars },
    relativeTo: __dirname,
    partialsPath: 'views/widgets',
    path: 'views/widgets',
    layout: true,
    layoutPath: 'views/layouts',
  });

  home(server);
  races(server);
  winners(server); 

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init().then(() => console.log('Server started'));
