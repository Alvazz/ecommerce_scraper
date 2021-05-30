const express = require("express");
const router = express.Router();

const auth_routes = require("./auth_routes");

router.use("/auth", auth_routes);

module.exports = router;
