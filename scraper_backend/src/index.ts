import { Server, ServerRegisterPluginObject } from '@hapi/hapi';

import * as Inert from "@hapi/inert";
import * as Vision from "@hapi/vision";
import * as HapiSwagger from 'hapi-swagger';

import DBManager from "./entity";
import { routes } from "./routes";
import { Environment } from "./config";

const server: Server = new Server({
  port: Environment.PORT,
  host: Environment.HOST,
});

const init = async () => {

  await new DBManager().dbInit();

  const swaggerOptions = {
    info: {
      title: 'Scraper API Documentation',
      version: "1.0.0.0",
    },
  };

  const plugins: Array<ServerRegisterPluginObject<any>> = [
    {
      plugin: Inert
    },
    {
      plugin: Vision
    },
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    }
  ];

  await server.register(plugins);
  await server.register(routes);

  console.log("Server on port", Environment.PORT);
  await server.start();

};

init();
