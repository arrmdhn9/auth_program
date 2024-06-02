require("dotenv").config();
const express = require("express");
const chalk = require("chalk");
const authController = require("./routes/authRoute");

// db
const database = require("./configs/database");

// models
const roleModel = require("./models/roleModel");
const userModel = require("./models/userModel");

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json()); // Middleware untuk parsing JSON

app.get("/", (req, res) => {
  res.json({ message: "Hello world!" });
});

// Gunakan routes
app.use("/users", authController);

database
  .sync()
  .then(() => {
    console.log(chalk.green(`Database connection successfully`));
  })
  .catch((error) => {
    console.error(chalk.red(`Database connection failed!`));
  });

app.listen(PORT, () => {
  console.log(chalk.italic.yellow(`App running on port ${PORT}`));
});
