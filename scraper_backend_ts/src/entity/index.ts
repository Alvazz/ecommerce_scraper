import "reflect-metadata";

import { Connection, createConnection } from "typeorm";
import { Environment } from "../config";

import { User } from "./User";

export const DBConnection = async (): Promise<Connection> => {  
  return await createConnection({
    type: Environment.DB_DIALECT,
    host: Environment.DB_HOST,
    password: Environment.DB_PASSWORD,
    database: Environment.DB_NAME,
    port: Environment.DB_PORT,
    username: Environment.DB_USER,
    entities: [
      User,
    ],
    synchronize: true,
    logging: false,
  });
};
