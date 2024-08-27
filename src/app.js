import { server as _server } from '@hapi/hapi';
import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import Handlebars from "handlebars";

import { home } from './routers/home.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const init = async () => {
  const server = _server({
    port: 5000,
    host: '0.0.0.0',
    debug: { request: ['error'] }
  });

  await server.register(Inert);
  await server.register(Vision);

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  server.views({
    engines: { html: Handlebars },
    relativeTo: __dirname,
    partialsPath: 'templates/widgets',
    path: 'templates/widgets',
    layout: true,
    layoutPath: 'templates/layouts',
  });

  home(server);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init().then(() => console.log('Server started'));
