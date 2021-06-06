const responseHelper = require("../helpers/response_helper");

const Link = require("../models/link");

const addLink = (req, res) => {
  try {

    // every link will be unique
    const { link } = req.body;

    const linkExists = await Link.findOne({
      where: {
        link,
      },
      attributes: ['id'],
      raw: true,
    });

    if (linkExists) {
      return responseHelper(res, "");
    }

    // Scrape the result from go.


  } catch (ex) {
    return responseHelper("SERVER500", ex);
  }
};

const deleteProduct = (req, res) => {

};

module.exports = {
  addLink,
};
