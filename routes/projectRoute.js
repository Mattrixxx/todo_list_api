const express = require("express");
const { authenticateToken } = require("../middlewares/authMiddleware");
const {
  createProject,
  getAllProjectsByUserId,
} = require("../controllers/projectController");
const { body } = require("express-validator");
const {
  checkUserAuthorization,
} = require("../middlewares/authorizationMiddleware");
const { validateRequest } = require("../middlewares/validationMiddleware");

const router = express.Router();

router.post(
  "/",
  [body("name").notEmpty().withMessage("Project name is required")],
  authenticateToken,
  checkUserAuthorization,
  validateRequest,
  createProject
);
router.get(
  "/",
  authenticateToken,
  checkUserAuthorization,
  getAllProjectsByUserId
);

module.exports = router;
