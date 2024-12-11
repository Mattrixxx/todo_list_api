const { validationResult } = require("express-validator");
const db = require("../models/db");

exports.createProject = async (req, res, next) => {
  try {
    const { name } = req.body;
    const userId = req.user.userId;

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
    const userId = req.user.userId;
    const result = await db.query(
      "SELECT id, name FROM projects WHERE user_id = $1",
      [userId]
    );

    res.status(200).json({
      message: "Projects retrieved successfully",
      project: result.rows,
    });
  } catch (error) {
    next(error);
  }
};
