const express = require("express");
const router = express.Router();

const auth_routes = require("./auth_routes");
const link_routes = require("./link_routes");

router.use("/auth", auth_routes);
router.use("/link", link_routes);

module.exports = router;
