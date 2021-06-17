import { ResponseObject, ResponseToolkit } from "@hapi/hapi";
import { log } from "console";

import { StatusCode } from "../config";
import { IStatus } from "../interfaces";

export class ResponseHelper {

  private statusCode: typeof StatusCode | any;

  constructor() {
    this.statusCode = StatusCode;
  }

  public success = (h: ResponseToolkit, code: string, data?: Object | any): ResponseObject => {

    const status: IStatus = this.statusCode[code];
    const response: Object | any = {};

    response.status = status;
    if (data) {
      response.data = data;
    }

    return h.response(response).code(status.status_code);

  };

  public error = (h: ResponseToolkit, code: string, error?: Object | any): ResponseObject => {

    const status: IStatus = this.statusCode[code];
    const response: Object | any = {};

    response.status = status;
    console.log(response.message);
    
    if (error) {
      console.log(error.message);
    }

    log("Error");
    log(error);
   
    return h.response(response).code(status.status_code);
  
  };

};
