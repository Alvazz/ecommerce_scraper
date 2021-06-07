const express = require("express");
const router = express.Router();

const { link_controller } = require("../controllers");
const authMiddleware = require("../middlewares/auth_middleware");

// Post requests
router.post("/create", authMiddleware, link_controller.addLink);

// Get requests
router.get("/list", authMiddleware, link_controller.getProducts);

module.exports = router;
