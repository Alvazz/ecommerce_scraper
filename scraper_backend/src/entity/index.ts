import "reflect-metadata";

import { Connection, ConnectionManager, ConnectionOptions, createConnection, EntityTarget, getConnectionManager, Repository } from "typeorm";
import { Environment } from "../config";

import { User } from "./User";

class DBManager {

  private connectionManager: ConnectionManager;

  constructor() {
    this.connectionManager = getConnectionManager();
  }

  public async dbInit() {
    await this.getConnection();
  }

  public async getConnection(): Promise<Connection> {
    
    let connection: Connection;
    const hasConnection = this.connectionManager.has(Environment.DB_NAME);
    
    if (hasConnection) {

      connection = this.connectionManager.get(Environment.DB_NAME);
      
      if (!connection.isConnected) {
        connection = await connection.connect();
      }

    } else {

      const connectionOptions: ConnectionOptions = {
        name: Environment.DB_NAME,
        type: Environment.DB_DIALECT,
        host: Environment.DB_HOST,
        port: Environment.DB_PORT,
        username: Environment.DB_USER,
        password: Environment.DB_PASSWORD,
        database: Environment.DB_NAME,
        synchronize: true,
        logging: false,
        entities: [User],
      };

      connection = await createConnection(connectionOptions);

    }

    return connection;

  }

  public async getEntityRepository(entity: any): Promise<Repository<any>> {
    return (await this.getConnection()).getRepository(entity);
  }

};

export default DBManager;
