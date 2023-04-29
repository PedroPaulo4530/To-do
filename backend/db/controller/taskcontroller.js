const Task = require("../models/task.js");

// Rota para cadastrar uma nova tarefa
exports.createTask = async (req, res) => {
  try {
    const { title, description, completed, user } = req.body;
    const newTask = new Task({
      title,
      description,
      completed,
      user,
    });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao cadastrar tarefa.");
  }
};

// Rota para buscar todas as tarefas cadastradas
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao buscar tarefas.");
  }
};

// Rota para buscar uma tarefa pelo ID
exports.getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    res.status(200).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao buscar tarefa.");
  }
};

// Rota para atualizar uma tarefa pelo ID
exports.updateTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed, user } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, completed, user },
      { new: true }
    );
    res.status(200).json(updatedTask);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao atualizar tarefa.");
  }
};

// Rota para deletar uma tarefa pelo ID
exports.deleteTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao deletar tarefa.");
  }
};
