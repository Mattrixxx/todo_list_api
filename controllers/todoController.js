const db = require("../models/db");

exports.getTodosByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const result = await db.query("SELECT * FROM todos WHERE created_by = $1", [
      userId,
    ]);
    res.status(201).json({
      data: result.rows,
    });
  } catch (error) {
    next(error);
  }
};

exports.crateTodoByUserId = async (req, res, next) => {
  try {
    
  } catch (error) {
    next(error);
  }
};
