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

// Create Pickup
router.post("/create", verifyToken, (req, res) => {
  const {
    ewaste_type,
    quantity,
    item_condition,
    address,
    city,
    postal_code,
    pickup_date,
    time_slot,
    phone_number
  } = req.body;

  if (
    !ewaste_type ||
    !quantity ||
    !item_condition ||
    !address ||
    !city ||
    !postal_code ||
    !pickup_date ||
    !time_slot ||
    !phone_number
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  db.query(
    `INSERT INTO pickups 
    (user_id, ewaste_type, quantity, item_condition, address, city, postal_code, pickup_date, time_slot, phone_number)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      req.userId,
      ewaste_type,
      quantity,
      item_condition,
      address,
      city,
      postal_code,
      pickup_date,
      time_slot,
      phone_number
    ],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      res.json({ message: "Pickup scheduled successfully", pickupId: result.insertId });
    }
  );
});


// ✅ View My Pickups
router.get("/my", verifyToken, (req, res) => {
  db.query(
    "SELECT * FROM pickups WHERE user_id = ? ORDER BY created_at DESC",
    [req.userId],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

module.exports = router;
