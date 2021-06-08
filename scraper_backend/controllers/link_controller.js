const { default: axios } = require("axios");
const responseHelper = require("../helpers/response_helper");

const Choice = require("../models/choice");
const Link = require("../models/link");
const Product = require("../models/product");

/**
 * Add new Link
 * @param {*} req 
 * @param {*} res 
 * @returns { Promise }
 * @constructor
 */
const addLink = async (req, res) => {
  try {

    const { user } = req;

    // every link will be unique
    const { link } = req.body;

    const linkExists = await Link.findOne({
      where: {
        url: link,
      },
      attributes: ['id', 'hit'],
      raw: true,
    });

    const linkPromiseList = [];
    if (!linkExists) {
      
      const linkPromise = Link.create({ url: link });
      linkPromiseList.push(linkPromise);

    } else {

      // update hit counter.
      const linkPromise = Link.update({ hit: linkExists.hit+1 }, {
        where: {
          id: linkExists.id,
        }
      });

      const productFromLink = Product.findOne({
        where: {
          link_id: linkExists.id
        },
        raw: true,
        attributes: ['id', 'lowest_price', 'current_price'],
      });

      linkPromiseList.push(linkPromise, productFromLink);

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

    const linkResponse = await Promise.all(linkPromiseList);
    // 0 link // 1 product db // product scraped

    const productResponse = linkResponse.length == 2 ? linkResponse[1] : linkResponse[2];
    const productRecord = linkResponse.length == 3 ? linkResponse[1] : null;
    const productData = productResponse.data;

    const linkId = linkExists ? linkExists.id : linkResponse[0].dataValues.id;

    let productId = productRecord.id;

    if (!productRecord) {

      const productCreated = await Product.create({
        name: productData.name,
        current_price: productData.price,
        lowest_price: productData.price,
        site: productData.site_name,
        link_id: linkId,
      });

      productId = productCreated.id;

    } else {

      const parsedPrice = productData.price;
      const lowestPrice = parseFloat(productRecord.lowest_price);

      let updateBody = {
        name: productData.name,
        site: productData.site_name,
        link_id: linkId,
        current_price: parsedPrice,
      }

      // if the price has reduced.
      if (parsedPrice < lowestPrice)
        updateBody.lowest_price = parsedPrice;

      await Product.update(updateBody, {
        where: {
          id: productId,
        }
      });
    }

    const choiceExists = await Choice.count({
      where: {
        user_id: user.id,
        product_id: productId,
      }
    });

    if (choiceExists === 0) {
      await Choice.create({
        user_id: user.id,
        product_id: productId,
      })
    }
    
    return responseHelper(res, "LINK201");

  } catch (ex) {
    console.log(ex.message);
    return responseHelper(res, "SERVER500", ex);
  }
};

/**
 * Get all products for user
 * @param {*} req 
 * @param {*} res 
 * @returns { Promise }
 * @constructor
 */
const getProducts = async (req, res) => {
  try {

    const { user } = req;

    const choices = await Choice.findAll({
      where: {
        user_id: user.id,
      },
      raw: true,
      attributes: ['id'],
      mapToModel: true,
      nest: true,
      include: [{
        model: Product,
        attributes: ['id', 'name', 'current_price', 'lowest_price', 'site'],
      }]
    });

    return responseHelper(res, "LINK200", choices);

  } catch (ex) {
    console.log(ex.message);
    return responseHelper(res, "SERVER500", ex);
  }
}

/**
 * Delete choice
 * @param {*} req 
 * @param {*} res 
 * @returns { Promise }
 * @constructor
 */
const deleteProduct = async (req, res) => {

  try {

    const { user, params } = req;

    await Choice.destroy({
      where: {
        user_id: user.id,
        product_id: params.id,
      }
    });

    return responseHelper(res, "CHOICE204");

  } catch (ex) {
    console.log(ex.message);
    return responseHelper(res, "SERVER500", ex);
  }
};

module.exports = {
  addLink,
  getProducts,
  deleteProduct,
};
