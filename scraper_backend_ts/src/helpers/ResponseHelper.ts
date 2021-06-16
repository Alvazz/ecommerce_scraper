import { ResponseToolkit } from "@hapi/hapi";

import { StatusCode } from "../config";

export const ResponseHelper = (h: ResponseToolkit, code: string, data?: Object | any) => {

  const statusObject = StatusCode[code];

  const responseObject: Object | any = {};
  responseObject.status = statusObject;

  if (data) {
    responseObject.data = data;
  }

  return h.response(responseObject).code(statusObject.status_code);

};
