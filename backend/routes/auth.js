const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



// REGISTER
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Name, email and password are required" });
  }

  db.query("SELECT id FROM users WHERE email = ?", [email], async (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    if (rows.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO users (email, password) VALUES (?, ?)",
      [email, hashed],
      (err2, result2) => {
        if (err2) return res.status(500).json({ error: err2.message });

        const userId = result2.insertId;

        db.query(
          "INSERT INTO user_profile (user_id, name) VALUES (?, ?)",
          [userId, name],
          (err3) => {
            if (err3) return res.status(500).json({ error: err3.message });

            return res.json({ message: "Registered successfully", userId });
          }
        );
      }
    );
  });
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

// route for signup with profile data
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Check if user already exists
    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
      if (err) return res.status(500).json({ error: "Server error" });
      if (result.length > 0) return res.status(400).json({ error: "User already exists" });

      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert into users table
      db.query(
        "INSERT INTO users (email, password) VALUES (?, ?)",
        [email, hashedPassword],
        (err, userResult) => {
          if (err) return res.status(500).json({ error: "Failed to create user" });

          const userId = userResult.insertId;

          // Insert into profile table (YOU will create this table)
          db.query(
            "INSERT INTO user_profile (user_id, name) VALUES (?, ?)",
            [userId, name],
            (err2) => {
              if (err2) return res.status(500).json({ error: "Failed to save profile data" });

              return res.json({ message: "Signup successful" });
            }
          );
        }
      );
    });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
});


module.exports = router;
