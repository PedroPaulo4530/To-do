require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const userController = require("./db/controller/usercontroller.js");
const taskController = require("./db/controller/taskcontroller.js");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

app.use(bodyParser.json());

const mongoUri = process.env.DB_CONNECTION_STRING;
mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

// USER ROUTES
app.post("/create/users", userController.createUser);
app.post("/login", userController.loginUser); // adicionada nova rota para login
app.get("/users", userController.getUsers);
app.get("/users/:id", userController.getUserById);
app.put("/users/update/:id", userController.updateUserById);
app.delete("/users/delete/:id", userController.deleteUserById);

// TASK ROUTES
app.post("/tasks/create", taskController.createTask);
app.get("/tasks", taskController.getTasks);
app.get("/tasks/:id", taskController.getTaskById);
app.put("/tasks/update/:id", taskController.updateTaskById);
app.delete("/tasks/delete/:id", taskController.deleteTaskById);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
