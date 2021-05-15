const User = require("../models/users");
const responseHelper = require("../helpers/response_helper");

const loginUser = async (req, res) => {
  console.log(req.body);
  return res.json("Hellow");
};

const registerUser = async (req, user) => {
  try {

    const {
      first_name,
      last_name,
      email,
      password
    } = req.body;

    const userFound = await User.findOne({
      where: { email },
      raw: true,
      attributes: ['id']
    });

    // Does the user already exists?
    if (userFound) {
      return responseHelper(res, "USER400");
    }

  } catch (ex) {
  }
};

module.exports = {
  loginUser,
  registerUser,
};
