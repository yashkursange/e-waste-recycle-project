const express = require("express");
const router = express.Router();
const db = require("../db");

// GET /leaderboard - Public route to fetch top recyclers
router.get("/", (req, res) => {
    // 1. We want to join `users` (to get email/id if needed), `user_profile` (to get name), and `pickups` (to get quantity)
    // 2. We sum the `quantity` of `pickups` where status is 'Completed'
    // 3. We group by user, order by total quantity descending, and limit to 10

    const query = `
        SELECT 
            u.id, 
            up.name, 
            COALESCE(SUM(p.quantity), 0) as items
        FROM 
            users u
        LEFT JOIN 
            user_profile up ON u.id = up.user_id
        LEFT JOIN 
            pickups p ON u.id = p.user_id AND p.status = 'Completed'
        GROUP BY 
            u.id, up.name
        HAVING 
            items > 0
        ORDER BY 
            items DESC
        LIMIT 10
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error("Leaderboard Error:", err);
            return res.status(500).json({ error: "Failed to fetch leaderboard data" });
        }
        res.json(results);
    });
});

module.exports = router;
