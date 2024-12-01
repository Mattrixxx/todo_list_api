const express = require("express");
const { authenticateToken } = require("../middlewares/authMiddleware");
const { createProject, getAllProjectsByUserId } = require("../controllers/projectController");
const { body } = require("express-validator");

const router = express.Router();

router.post(
  "/:userId",
  [body("name").notEmpty().withMessage("Project name is required")],
  authenticateToken,
  createProject
);
router.get(
    "/:userId",authenticateToken,getAllProjectsByUserId
)

module.exports = router;
