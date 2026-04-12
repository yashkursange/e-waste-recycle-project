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

      // After successful pickup insertion, update missing profile items!
      db.query(
        "UPDATE users SET address = COALESCE(NULLIF(address, ''), ?), city = COALESCE(NULLIF(city, ''), ?), zip = COALESCE(NULLIF(zip, ''), ?), phone = COALESCE(NULLIF(phone, ''), ?) WHERE id = ?",
        [address, city, postal_code, phone_number, req.userId],
        (errProfile) => {
          if (errProfile) console.error("Could not update profile fields:", errProfile.message);
          res.json({ message: "Pickup scheduled successfully", pickupId: result.insertId });
        }
      );
    }
  );
});


// ✅ View My Pickups
router.get("/my", verifyToken, (req, res) => {
  db.query(
    "SELECT *, DATE_FORMAT(pickup_date, '%b %d, %Y') as formatted_date FROM pickups WHERE user_id = ? ORDER BY created_at DESC",
    [req.userId],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      
      const formattedPickups = rows.map(row => ({
        id: row.id,
        date: row.formatted_date,
        pickupDate: `${row.formatted_date} - ${row.time_slot}`,
        scheduleType: row.time_slot?.includes("Morning") ? "Express" : "Standard",
        status: row.status.toLowerCase(),
        items: [
          { name: row.ewaste_type || "E-Waste", quantity: row.quantity || 1 }
        ],
        weight: row.quantity * 2.5, // dummy weight estimate based on qty
        rewardPoints: (row.quantity || 1) * 50, // 50 points per quantity unit
        cancellationReason: row.status === 'Cancelled' ? "User cancelled" : null
      }));
      res.json(formattedPickups);
    }
  );
});

// ✅ Tracking details
router.get("/:id/tracking", verifyToken, (req, res) => {
  db.query(
    "SELECT * FROM pickups WHERE id = ? AND user_id = ?",
    [req.params.id, req.userId],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      if (rows.length === 0) return res.status(404).json({ error: "Pickup not found" });

      const pickup = rows[0];
      // Generate some dummy response for tracking
      res.json({
        id: `#ECO-${pickup.id}`,
        date: pickup.pickup_date,
        time: pickup.time_slot,
        address: pickup.address,
        driverName: "Rohan Kumar",
        status: pickup.status.toLowerCase()
      });
    }
  );
});

// ✅ Cancel Pickup
router.put("/:id/cancel", verifyToken, (req, res) => {
  db.query(
    "UPDATE pickups SET status = 'Cancelled' WHERE id = ? AND user_id = ?",
    [req.params.id, req.userId],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ error: "Pickup not found or unauthorized" });
      res.json({ message: "Pickup cancelled successfully" });
    }
  );
});

// ✅ Reschedule Pickup
router.put("/:id/reschedule", verifyToken, (req, res) => {
  const { newDate } = req.body;
  if(!newDate) return res.status(400).json({ error: "Date is required" });
  
  db.query(
    "UPDATE pickups SET pickup_date = ? WHERE id = ? AND user_id = ?",
    [newDate, req.params.id, req.userId],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ error: "Pickup not found or unauthorized" });
      res.json({ message: "Pickup rescheduled successfully" });
    }
  );
});

module.exports = router;
