const statusCode = require("../config/constant");

module.exports = (response, code, data) => {

  const statusFound = statusCode[code];
  return data ? 
    response.status(statusCode.status_code).json(statusFound, { data: data }) : 
    response.status(statusCode.status_code).json(statusFound);

};
