module.exports = (req, res, next) => {
  console.log(`Request URL => ${req.method} | ${req.protocol}://${req.headers.host}${req.url}`);
  next();
};
