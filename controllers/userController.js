const db = require("../models/db");

exports.getAllUsers = async (req, res, next) => {
  try {
    const result = await db.query("SELECT id, username, email FROM users");
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};
