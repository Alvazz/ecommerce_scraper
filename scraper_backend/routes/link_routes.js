const express = require("express");
const router = express.Router();

const { link_controller } = require("../controllers");

// Post requests
router.post("/create", link_controller.addLink);

module.exports = router;
