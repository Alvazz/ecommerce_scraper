import { Repository } from "typeorm";

import DBManager from "../entity";

export class BaseService {

  protected entityRepository: Repository<any>;
  protected dbManager: DBManager;

  constructor(entity: any) {
    (async () => { await this.serviceInit(entity) })();
  }

  async serviceInit(entity) {
    this.dbManager = await new DBManager();
    this.entityRepository = await this.dbManager.getEntityRepository(entity);
  }

};