require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const roleModel = require("../models/roleModel");

exports.register = async (req, res) => {
  try {
    const { username, password, roleName } = req.body;

    // Cek jika role ada
    const role = await roleModel.findOne({ where: { name: roleName } });
    if (!role) {
      return res.status(400).json({ message: error });
    }

    // Enkripsi password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Membuat user baru
    const user = await userModel.create({
      username,
      password: hashedPassword,
      roleId: role.id
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await userModel.findOne({
      where: { username },
      include: [{ model: roleModel, as: "role", attributes: ["name"] }] // Gunakan 'as' yang sesuai dengan asosiasi
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password doesn't match" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role.name }, // Pastikan 'role' sesuai dengan alias
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successfully", token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};