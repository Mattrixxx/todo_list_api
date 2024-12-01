const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const errorHandler = require("./middlewares/errorHandler");

const userRoutes = require("./routes/userRoute");
const authRoutes = require("./routes/authRoute");
const todoRoutes = require("./routes/todoRoutes");
const projectRoutes = require("./routes/projectRoute");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.json());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/projects", projectRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
