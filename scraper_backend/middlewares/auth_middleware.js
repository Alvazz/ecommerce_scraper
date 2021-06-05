const { verifyToken } = require("../helpers/auth_helper");
const responseHelper = require("../helpers/response_helper");

/**
 * Validate token for user 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns { Promise } 
 */
module.exports = async (req, res, next) => {
  try {

    const { authorization } = req.headers;
    const validToken = await verifyToken(authorization);

    if (validToken.id) {

      req.user = { id: validToken.id };
      next();

    } else {
      return responseHelper(res, "AUTH403");
    }

  } catch (ex) {
    console.log(ex.message);
    return responseHelper(res, "SERVER500", ex);
  }
};
