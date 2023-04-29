const User = require("../models/user.js");
const bcrypt = require("bcrypt");

// Rota para cadastrar um novo usuário
exports.createUser = async (req, res) => {
  try {
    const { email, password, description } = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ email, password: hashedPassword, description });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao cadastrar usuário.");
  }
};

// Rota para fazer login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Encontra o usuário com o email passado como parâmetro
    const user = await User.findOne({ email });

    if (!user) {
      // Se o usuário não existir, retorna um erro 401
      return res.status(401).json({ message: "Credenciais inválidas." });
    }

    // Verifica se a senha é válida
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      // Se a senha for inválida, retorna um erro 401
      return res.status(401).json({ message: "Credenciais inválidas." });
    }

    // Se chegou aqui, as credenciais são válidas e o usuário está autenticado
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao fazer login.");
  }
};

// Rota para buscar todos os usuários cadastrados
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao buscar usuários.");
  }
};

// Rota para buscar um usuário pelo ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao buscar usuário.");
  }
};

// Rota para atualizar um usuário pelo ID
exports.updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password, description } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { email, password, description },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao atualizar usuário.");
  }
};

// Rota para deletar um usuário pelo ID
exports.deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao deletar usuário.");
  }
};
