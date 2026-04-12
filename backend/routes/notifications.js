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

// GET all notifications
router.get("/", verifyToken, (req, res) => {
  db.query(
    "SELECT id, type, title, message, is_read, DATE_FORMAT(created_at, '%b %d, %Y - %I:%i %p') AS timestamp FROM notifications WHERE user_id = ? ORDER BY created_at DESC",
    [req.userId],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      
      const formatted = rows.map(r => ({
        ...r,
        isRead: Boolean(r.is_read)
      }));
      res.json(formatted);
    }
  );
});

// PUT mark notification as read
router.put("/read/:id", verifyToken, (req, res) => {
  const { isRead } = req.body;
  db.query(
    "UPDATE notifications SET is_read = ? WHERE id = ? AND user_id = ?",
    [isRead ? 1 : 0, req.params.id, req.userId],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Notification updated" });
    }
  );
});

// PUT mark all as read
router.put("/read-all", verifyToken, (req, res) => {
  db.query(
    "UPDATE notifications SET is_read = 1 WHERE user_id = ?",
    [req.userId],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "All notifications marked as read" });
    }
  );
});

// DELETE clear all
router.delete("/clear-all", verifyToken, (req, res) => {
  db.query(
    "DELETE FROM notifications WHERE user_id = ?",
    [req.userId],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "All notifications clear" });
    }
  );
});

// DELETE single notification
router.delete("/:id", verifyToken, (req, res) => {
  db.query(
    "DELETE FROM notifications WHERE id = ? AND user_id = ?",
    [req.params.id, req.userId],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Notification deleted" });
    }
  );
});


module.exports = router;
