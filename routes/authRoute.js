const express = require("express");
const { body } = require("express-validator");
const { register, login } = require("../controllers/authController");
const { validateRequest } = require("../middlewares/validationMiddleware");

const router = express.Router();

router.post(
  "/register",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  validateRequest,
  register
);

router.post(
  "/login",
  [
    body("usernameOrEmail")
      .notEmpty()
      .withMessage("Username or Email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  validateRequest,
  login
);

module.exports = router;
