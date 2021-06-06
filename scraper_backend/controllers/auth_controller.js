const User = require("../models/users");
const UserVerification = require("../models/user_verification");

const responseHelper = require("../helpers/response_helper");

const {
  comparePassword,
  hashPassword,
  createToken,
  generateOTP,
} = require("../helpers/auth_helper");

/**
 * Handle user login 
 * @param {*} req 
 * @param {*} res 
 * @constructor
 * @returns { Promise } 
 */
const loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;

    // Check if the user exists?
    const userFound = await User.findOne({
      where: { email },
      attributes: ['id', 'password', 'is_active'],
      raw: true,
    });

    if (!userFound) {
      return responseHelper(res, "USER404");
    }

    // check if the user is verifed.
    if (!userFound.is_active) {
      return responseHelper(res, "USER403");
    }

    // user is activated, now check if the password matches?
    const isMatch = comparePassword(password, userFound.password);
    if (!isMatch) {
      return responseHelper(res, "USER401");
    }

    // finally the password is match, create a token
    const token = await createToken({
      id: userFound.id,
    });

    // Return final response
    return responseHelper(res, "LOGIN200", { token });

  } catch (ex) {
    console.log(ex.message);
    return responseHelper(res, "SERVER500", ex);
  }
};

/**
 * User registraton
 * @param {*} req 
 * @param {*} res 
 * @constructor
 * @returns { Promise }
 */
const registerUser = async (req, res) => {
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

    // Create a hash
    const hash = hashPassword(password);

    // create a new user
    const userCreated = await User.create({
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: hash,
      is_active: false,
    });

    const newUserId = userCreated.getDataValue("id");
    console.log(newUserId);

    // Generate an otp for the user
    const otp = generateOTP(6);

    await UserVerification.create({
      otp: otp,
      user_id: newUserId,
      is_revoked: false,
    });

    return responseHelper(res, "USER201");

  } catch (ex) {
    return responseHelper(res, "SERVER500", ex);
  }
};

/**
 * Verify user to after otp validation
 * @param {*} req 
 * @param {*} res 
 * @constructor
 * @returns { Promise }
 */
const verifyUser = async (req, res) => {
  try {

    const { otp, email } = req.body;

    // get the otp for the user. 
    const verificationExists = await UserVerification.findOne({
      where: {
        otp,
        is_revoked: false,
      },
      mapToModel: true,
      nest: true,
      raw: true,
      attributes: ['id', 'created_at', 'expire_at', 'is_revoked'],
      include: [
        {
          model: User,
          where: {
            email
          },
          attributes: ['id', 'is_active'],
          required: true,
        },
      ],
    });

    // Does the verification exists?
    if (!verificationExists) {
      return responseHelper(res, "VERIFY404");
    }

    if (verificationExists.expire_at < new Date()) {
      return responseHelper(res, "OTPEXPIRE400");
    }

    // Revoke all otp and verify user.

    const revokeOtp = UserVerification.update({
      is_revoked: true,
    }, {
      where: {
        user_id: verificationExists.user.id,
      }
    });

    // Verify user
    const activateUser = User.update({
      is_active: true
    }, {
      where: {
        id: verificationExists.user.id,
      }
    });

    await Promise.all([revokeOtp, activateUser]);
    return responseHelper(res, "VERIFY200");

  } catch (ex) {
    console.log(ex.message);
    return responseHelper(res, "SERVER500", ex);
  }
};

/**
 * Send verification to user
 * @param {*} req 
 * @param {*} res 
 * @constructor
 * @returns { Promise }
 */
const sendVerification = async (req, res) => {

  try {

    const { email } = req.body;

    const userExists = await User.findOne({
      where: { email },
      raw: true,
      attributes: ['id']
    });

    if (!userExists) {
      return responseHelper(res, "USER404");
    }

    // Create a new otp after revoking all old ones.
    await UserVerification.update({ is_revoked: true }, {
      where: {
        user_id: userExists.id,
      }
    });

    // Finally create a new record in the db.
    await UserVerification.create({
      user_id: userExists.id, 
      is_revoked: false,
      otp: generateOTP(6),
    });

    return responseHelper(res, "OTPSENT200");

  } catch (ex) {
    return responseHelper(res, "SERVER500", ex);
  }

};

/**
 * Get user details
 * @param {*} req 
 * @param {*} res 
 * @constructor
 * @returns { Promise } 
 */
const userDetails = async (req, res) => {
  
  try {

    const { id } = req.user;

    const userDetails = await User.findOne({
      where: { id },
      raw: true,
      attributes: [
        'id', 
        'first_name', 'last_name', 
        'email', 'phone',
      ],
    });

    return responseHelper(res, "USER200", { user: userDetails });

  } catch (ex) {
    return responseHelper(res, "SERVER500", ex);
  }
};

module.exports = {
  loginUser,
  registerUser,
  verifyUser,
  sendVerification,
  userDetails,
};
