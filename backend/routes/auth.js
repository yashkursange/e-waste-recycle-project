const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// REGISTER
router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users (email, password) VALUES (?,?)",
    [email, hashed],
    (err, result) => {
      if (err) return res.status(400).json({ error: "User Exists!" });
      res.json({ message: "Registered successfully" });
    }
  );
});

// LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
    if (err) return res.status(500).json({ error: "Server Error" });
    if (result.length === 0) return res.status(400).json({ error: "User not found" });

    const user = result[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign({ id: user.id }, "SECRET123", { expiresIn: "1d" });
    res.json({ message: "Login successful", token });
  });
});

module.exports = router;
