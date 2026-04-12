const express = require("express");
const router = express.Router();
const db = require("../db");
const jwt = require("jsonwebtoken");

// verify JWT middleware
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token missing" });

  jwt.verify(token, "SECRET123", (err, decoded) => {
    if (err) return res.status(401).json({ error: "Invalid token" });

    req.userId = decoded.id;
    next();
  });
};

// GET User Profile
router.get("/", verifyToken, (req, res) => {
  db.query(
    "SELECT name, email, phone, address, city, zip, picture FROM users WHERE id = ?",
    [req.userId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) return res.status(404).json({ error: "User not found" });
      res.json(results[0]);
    }
  );
});

// PUT Update User Profile
router.put("/", verifyToken, (req, res) => {
  const { name, phone, address, city, zip } = req.body;
  db.query(
    "UPDATE users SET name = ?, phone = ?, address = ?, city = ?, zip = ? WHERE id = ?",
    [name, phone, address, city, zip, req.userId],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Profile updated successfully" });
    }
  );
});

module.exports = router;
