const Hapi = require('@hapi/hapi');
const Handlebars = require('handlebars');
const Plugins = require('./modules/plugins');
const routes = require('./routes');
const helperFn = require('./modules/helpers');
const package = require('./package.json');

const Inert = require('@hapi/inert'),
	Vision = require('@hapi/vision');

Handlebars.registerHelper(helperFn());

const init = async () => {
  //Init server
  const server = await new Hapi.server({
    port: 8000,
    host: 'localhost'
  })

  // register all plugins
   await server.register([
    Inert,
    Vision,
    {
        plugin: require('hapi-swagger'),
        options: {
          info: {
                  title: 'Test API Documentation',
                  version: package.version,
              },
          }
    }
  ]);

  // start teh server
  try {
      await server.start();
      console.log('Server running at:', server.info.uri);
  } catch(err) {
      console.log(err); 
  }

  // configuration handlebars as view template engine
  server.views({
    engines: {
      html: Handlebars
    },
    relativeTo: __dirname,
    path: 'views'
  });

  // define routes by calling the routes function which return all routes
  server.route(routes());
}

init().catch(err => console.log(err))