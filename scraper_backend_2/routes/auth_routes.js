const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth_middleware");
const { auth_controller } = require("../controllers");
const {
  login_validation,
  register_validation
} = require("../validations/auth_validations");

// Post requests
router.post("/login", login_validation.body, auth_controller.loginUser);

router.post("/register", register_validation.body, auth_controller.registerUser);

router.post("/verify", auth_controller.verifyUser);

router.post("/resend_otp", auth_controller.sendVerification);


// Get requests
router.get("/user", authMiddleware, auth_controller.userDetails);

module.exports = router;
