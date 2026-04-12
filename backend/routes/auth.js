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
      "INSERT INTO users (email, password, name) VALUES (?, ?, ?)",
      [email, hashed, name],
      (err2, result2) => {
        if (err2) return res.status(500).json({ error: err2.message });
        const userId = result2.insertId;
        return res.json({ message: "Registered successfully", userId });
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
        "INSERT INTO users (email, password, name) VALUES (?, ?, ?)",
        [email, hashedPassword, name],
        (err, userResult) => {
          if (err) return res.status(500).json({ error: "Failed to create user" });
          return res.json({ message: "Signup successful" });
        }
      );
    });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
});


const https = require("https");

// GOOGLE OAUTH LOGIN
router.post("/google", (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ error: "Token is required" });

  const url = `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`;
  
  https.get(url, (response) => {
    let data = '';
    response.on('data', chunk => data += chunk);
    response.on('end', () => {
      try {
        const payload = JSON.parse(data);
        if (payload.error) return res.status(401).json({ error: "Invalid Google token" });
        
        const { email, name, picture } = payload;
        if (!email) return res.status(400).json({ error: "Email not provided by Google" });
        
        db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
          if (err) return res.status(500).json({ error: "Server error" });
          
          if (result.length > 0) {
            const user = result[0];
            // Update the picture and name just in case they changed on Google
            db.query("UPDATE users SET name = COALESCE(name, ?), picture = ? WHERE id = ?", [name, picture, user.id]);

            const jwtToken = jwt.sign({ id: user.id }, "SECRET123", { expiresIn: "1d" });
            return res.json({ message: "Google login successful", token: jwtToken });
          } else {
            const randomPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = await bcrypt.hash(randomPassword, 10);
            
            db.query(
              "INSERT INTO users (email, password, name, picture) VALUES (?, ?, ?, ?)",
              [email, hashedPassword, name || "Google User", picture || null],
              (err2, userResult) => {
                if (err2) return res.status(500).json({ error: "Failed to create user" });
                const userId = userResult.insertId;
                
                const jwtToken = jwt.sign({ id: userId }, "SECRET123", { expiresIn: "1d" });
                return res.json({ message: "Google signup successful", token: jwtToken });
              }
            );
          }
        });
      } catch(e) {
        return res.status(500).json({ error: "Error parsing Google response" });
      }
    });
  }).on('error', (e) => {
    return res.status(500).json({ error: "Failed to contact Google servers" });
  });
});

module.exports = router;
