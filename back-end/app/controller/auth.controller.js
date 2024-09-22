const userService = require("../services/user.service");
const { v4: uuidv4 } = require("uuid");
const has = require("../../database/configs/jwt");
const createUser = async (req, res) => {
  try {
    const hashedPassword = await has.hashPassword(req.body.password);
    const body = {
      id: uuidv4(),
      phone: req.body.phone,
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      role: "10",
      lang: "en",
    };
    const repose = userService.register(body);
    if (repose) {
      res.status(201).json(repose);
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" + error });
  }
};

const login = async (req, res) => {
  try {
    const body = {
      email: req.body.email,
      password: has.hashPassword(req.body.password),
    };
    if (!body.email) {
      return res.status(400).json({ message: "email cannot be blank" });
    }
    if (!body.password) {
      return res.status(400).json({ message: "password cannot be blank" });
    }
    const repose = await userService.login(body);
    if (repose.status === 200) {
      res.status(200).json(repose);
    } else {
      return res.status(repose.status).json({ message: repose.message });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" + error });
  }
};

module.exports = {
  login,
  createUser,
};
