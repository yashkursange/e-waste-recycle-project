const db = require("./db");

const testQueries = async () => {
    const userId = 1; // Assuming a user ID exists

    console.log("--- Testing Upcoming Pickup Query ---");
    try {
        const res = await new Promise((resolve, reject) => {
            db.query(
                "SELECT id, pickup_date, time_slot, address, status FROM pickups WHERE user_id = ? ORDER BY created_at DESC LIMIT 1",
                [userId],
                (err, results) => {
                    if (err) reject(err);
                    else resolve(results);
                }
            );
        });
        console.log("Success:", res);
    } catch (e) {
        console.error("Error:", e.message);
    }

    console.log("\n--- Testing Total Quantity Query ---");
    try {
        const res = await new Promise((resolve, reject) => {
            db.query(
                "SELECT SUM(quantity) as total_quantity FROM pickups WHERE user_id = ? AND status = 'Completed'",
                [userId],
                (err, results) => {
                    if (err) reject(err);
                    else resolve(results);
                }
            );
        });
        console.log("Success:", res);
    } catch (e) {
        console.error("Error:", e.message);
    }

    console.log("\n--- Testing Activity Query ---");
    try {
        const res = await new Promise((resolve, reject) => {
            db.query(
                "SELECT id, pickup_date, status, created_at, ewaste_type, quantity FROM pickups WHERE user_id = ? ORDER BY created_at DESC LIMIT 4",
                [userId],
                (err, results) => {
                    if (err) reject(err);
                    else resolve(results);
                }
            );
        });
        console.log("Success:", res);
    } catch (e) {
        console.error("Error:", e.message);
    }

    process.exit();
};

testQueries();
