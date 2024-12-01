const express = require("express");
const { authenticateToken } = require("../middlewares/authMiddleware");
const {
  getTodosByUserId,
  crateTodoByUserId,
} = require("../controllers/todoController");
const { body } = require("express-validator");
const { checkUserAuthorization } = require("../middlewares/authorizationMiddleware");
const { validateRequest } = require("../middlewares/validationMiddleware");

const router = express.Router();

router.get("/:userId", authenticateToken, checkUserAuthorization, getTodosByUserId);
router.post(
  "/:userId",
  [
    body("projectId").notEmpty().withMessage("ProjectId is required"),
    body("title").notEmpty().withMessage("Title is required"),
    body("start_date")
      .notEmpty()
      .withMessage("Start date is required")
      .isISO8601()
      .withMessage("Start date must be in ISO 8601 format (YYYY-MM-DD)"),
    body("end_date")
      .optional()
      .isISO8601()
      .withMessage("End date must be in ISO 8601 format (YYYY-MM-DD)"),
    body("progress")
      .optional()
      .isIn([25, 50, 75, 100])
      .withMessage(
        "Progress must be one of the following values: 25, 50, 75, 100"
      ),
  ],
  authenticateToken,
  checkUserAuthorization,
  validateRequest,
  crateTodoByUserId
);

module.exports = router;
