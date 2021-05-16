const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { TOKEN_SECRET } = require("../config/env");

const createToken = (payload) => {
  try {
    const token = jwt.sign(payload, TOKEN_SECRET);
    return Promise.resolve(token);
  } catch (ex) {
    console.log(ex.message);
    return Promise.reject(null);
  }
};

const verifyToken = (token) => {
  try {
    return Promise.resolve(jwt.verify(token, TOKEN_SECRET));
  } catch (ex) {
    return Promise.reject(ex.message);
  }
};

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

const comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

const generateOTP = (size) => {
          
  // Declare a digits variable 
  // which stores all digits
  var digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < size; i++ ) {
      OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

module.exports = {
  createToken,
  verifyToken,
  hashPassword,
  comparePassword,
  generateOTP,
};
