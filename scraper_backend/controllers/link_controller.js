const { default: axios } = require("axios");
const responseHelper = require("../helpers/response_helper");

const Link = require("../models/link");

const addLink = async (req, res) => {
  try {

    // every link will be unique
    const { link } = req.body;

    const linkExists = await Link.findOne({
      where: {
        url: link,
      },
      attributes: ['id', 'hit'],
      raw: true,
    });

    let linkPromiseList = [];
    if (!linkExists) {
      let linkPromise = Link.create({ url: link });
      linkPromiseList.push(linkPromise);
    } else {
      // update hit counter.
      let linkPromise = Link.update({ hit: linkExists.hit+1 }, {
        where: {
          id: linkExists.id,
        }
      });
      linkPromiseList.push(linkPromise);
    }

    // Scrape the result from go.
    const productDetails = axios.post("http://localhost:8000/scraper/scrape_amazon", {
      url: link,
    }, {
      headers: {
        "content-type": "application/json"
      }
    });

    linkPromiseList.push(productDetails);

    let linkResponse = await Promise.all(linkPromiseList);
    let productResponse = linkResponse.length == 1 ? linkResponse[0] : linkResponse[1];
    let productData = productResponse.data;
    
    return responseHelper(res, "LINK200", productData);

  } catch (ex) {
    console.log(ex.message);
    return responseHelper(res, "SERVER500", ex);
  }
};

module.exports = {
  addLink,
};
