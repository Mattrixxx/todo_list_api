const { validationResult } = require("express-validator");
const db = require("../models/db");

exports.createProject = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Valodation failed");
      error.status = 400;
      error.details = errors.array();
      throw error;
    }

    const { userId } = req.params;
    const { name } = req.body;
    const tokenUserId = req.user.userId;

    if (parseInt(userId) !== tokenUserId) {
      const error = new Error(
        "You are not authorized to access this resource."
      );
      error.status = 403;
      throw error;
    }

    const existingProject = await db.query(
      "SELECT * FROM projects WHERE user_id = $1 AND name = $2",
      [userId, name]
    );

    if (existingProject.rows.length > 0) {
      const error = new Error("Project name already exists.");
      error.status = 400;
      throw error;
    }

    const result = await db.query(
      "INSERT INTO projects (user_id, name) VALUES ($1, $2) RETURNING id, name",
      [userId, name]
    );

    res.status(201).json({
      message: "Insert project Successfully",
      project: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllProjectsByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const tokenUserId = req.user.userId;

    if (parseInt(userId) !== tokenUserId) {
      const error = new Error(
        "You are not authorized to access this resource."
      );
      error.status = 403;
      throw error;
    }

    const result = await db.query(
      "SELECT id, name FROM projects WHERE user_id = $1",
      [userId]
    );

    res
      .status(200)
      .json({
        message: "Projects retrieved successfully",
        project: result.rows,
      });
  } catch (error) {
    next(error);
  }
};
