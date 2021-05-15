const express = require("express");
const router = express.Router();

const { auth_controller } = require("../controllers");
const {
  login_validation,
  register_validation
} = require("../validations/auth_validations");

router.post(
  "/login",
  login_validation.body,
  auth_controller.loginUser,
);

router.post(
  "/register",
  register_validation.body,
  auth_controller.registerUser,
)

module.exports = router;
