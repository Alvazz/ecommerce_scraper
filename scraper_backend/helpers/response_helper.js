const statusCode = require("../config/status_code");

module.exports = (response, code, data) => {

  // get the code 
  const statusFound = statusCode[code];

  // pass the code with the response
  return data ? 
    response.status(statusFound.status_code).json({ status: statusFound, data }) : 
    response.status(statusFound.status_code).json({ status: statusFound });

};
