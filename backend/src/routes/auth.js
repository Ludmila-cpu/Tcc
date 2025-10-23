const express = require("express");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");

const router = express.Router();

// Registro
router.post(
  "/register",
  [
    check("name", "Nome é obrigatório").not().isEmpty(),
    check("email", "Email inválido").isEmail(),
    check("password", "Senha deve ter no mínimo 6 caracteres").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, password } = req.body;

      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "Usuário já existe" });
      }

      user = new User({
        name,
        email,
        password
      });

      await user.save();

      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET || "seu_jwt_secret",
        { expiresIn: "24h" }
      );

      res.status(201).json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Erro no servidor" });
    }
  }
);

// Login
router.post(
  "/login",
  [
    check("email", "Email inválido").isEmail(),
    check("password", "Senha é obrigatória").exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "Credenciais inválidas" });
      }

      const isMatch = await user.checkPassword(password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Credenciais inválidas" });
      }

      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET || "seu_jwt_secret",
        { expiresIn: "24h" }
      );

      res.json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Erro no servidor" });
    }
  }
);

// Obter dados do usuário autenticado
router.get("/me", async (req, res) => {
  try {
    const token =
      req.header("x-auth-token") ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ msg: "Token não fornecido" });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "seu_jwt_secret"
    );
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado" });
    }

    res.json({ success: true, user });
  } catch (err) {
    console.error(err);
    res.status(401).json({ msg: "Token inválido" });
  }
});

module.exports = router;
