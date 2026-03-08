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

// GET Dashboard Data
router.get("/", verifyToken, async (req, res) => {
    try {
        const userId = req.userId;

        // 1. Get upcoming pickup (most recent future pickup, or just latest if dates aren't strictly managed)
        const pickupPromise = new Promise((resolve, reject) => {
            db.query(
                "SELECT id, pickup_date, time_slot, address, status FROM pickups WHERE user_id = ? ORDER BY created_at DESC LIMIT 1",
                [userId],
                (err, results) => {
                    if (err) {
                        console.error("SQL ERR 1:", err);
                        reject(err);
                    }
                    else resolve(results[0] || null);
                }
            );
        });

        // 2. Get impact stats (total quantity recycled)
        const statsPromise = new Promise((resolve, reject) => {
            db.query(
                "SELECT SUM(quantity) as total_quantity FROM pickups WHERE user_id = ? AND status = 'Completed'",
                [userId],
                (err, results) => {
                    if (err) {
                        console.error("SQL ERR 2:", err);
                        reject(err);
                    }
                    else resolve(results[0]?.total_quantity || 0);
                }
            );
        });

        // 3. Get total rewards
        // The user_profile table provided doesn't have a points column.
        // Assuming there isn't one yet, we will just return 0 to avoid crashing.
        const rewardsPromise = new Promise((resolve, reject) => {
            resolve(0);
        });

        // 4. Get recent activity
        const activityPromise = new Promise((resolve, reject) => {
            db.query(
                "SELECT id, pickup_date, status, created_at, ewaste_type, quantity FROM pickups WHERE user_id = ? ORDER BY created_at DESC LIMIT 4",
                [userId],
                (err, results) => {
                    if (err) {
                        console.error("SQL ERR 4:", err);
                        reject(err);
                    }
                    else resolve(results);
                }
            );
        });

        const [upcomingPickupData, totalEwaste, rewards, rawActivities] = await Promise.all([
            pickupPromise,
            statsPromise,
            rewardsPromise,
            activityPromise,
        ]);

        // Format the response
        const upcomingPickup = upcomingPickupData
            ? {
                id: `PU-2024-${upcomingPickupData.id}`,
                date: upcomingPickupData.pickup_date ? new Date(upcomingPickupData.pickup_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'TBD',
                timeSlot: upcomingPickupData.time_slot || 'TBD',
                address: upcomingPickupData.address || '',
                status: upcomingPickupData.status || "Scheduled",
            }
            : null;

        const ewasteValue = totalEwaste || 0;
        const co2Saved = (ewasteValue * 2.8).toFixed(1);

        const impactStats = [
            { label: "E-waste Recycled", value: String(ewasteValue), unit: "kg", iconName: "Package" },
            { label: "CO₂ Saved", value: String(co2Saved), unit: "kg", iconName: "Leaf" },
            { label: "Rewards Earned", value: String(rewards || 0), unit: "pts", iconName: "Award" },
        ];

        const recentActivity = (rawActivities || []).map((act) => {
            let text = "";
            let iconName = "CheckCircle";
            if (act.status === 'Completed') {
                text = `E-waste collected - ${act.quantity || 0}kg`;
                iconName = "Package";
            } else {
                text = `Pickup scheduled for ${act.ewaste_type || 'e-waste'}`;
                iconName = "Calendar";
            }

            const dateObj = act.created_at ? new Date(act.created_at) : (act.pickup_date ? new Date(act.pickup_date) : new Date());
            const daysAgo = Math.floor((new Date() - dateObj) / (1000 * 60 * 60 * 24));
            const dateStr = daysAgo === 0 ? 'Today' : (daysAgo === 1 ? 'Yesterday' : `${daysAgo} days ago`);

            return {
                text,
                date: dateStr,
                iconName
            };
        });

        res.json({
            upcomingPickup,
            impactStats,
            recentActivity,
        });
    } catch (error) {
        console.error("DASHBOARD CATCH ERROR:", error);
        res.status(500).json({ error: "Failed to fetch dashboard data" });
    }
});

module.exports = router;
