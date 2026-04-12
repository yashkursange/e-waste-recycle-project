const db = require('./db');

const setup = async () => {
  const query = (sql, params = []) => new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });

  try {
    // 1. Add columns to users table
    const columnsToAdd = [
      "name VARCHAR(255)",
      "phone VARCHAR(50)",
      "address VARCHAR(500)",
      "city VARCHAR(100)",
      "zip VARCHAR(20)"
    ];

    for (const col of columnsToAdd) {
      try {
        await query(`ALTER TABLE users ADD COLUMN ${col}`);
        console.log(`Added column ${col} to users`);
      } catch (err) {
        if (err.code === 'ER_DUP_FIELDNAME') {
          console.log(`Column ${col.split(' ')[0]} already exists.`);
        } else {
          console.error(`Error adding column ${col}:`, err.message);
        }
      }
    }

    // 2. Create notifications table
    await query(`
      CREATE TABLE IF NOT EXISTS notifications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        type VARCHAR(50) NOT NULL,
        title VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);
    console.log("Notifications table created or exists.");

    // 3. Clear existing dummy notifications and seed dummy notifications for user 1 (assuming user 1 exists)
    // We will just fetch all users and add dummy notifications to the first one
    const users = await query("SELECT id FROM users LIMIT 1");
    if (users.length > 0) {
      const userId = users[0].id;
      // Clear old notifications for testing
      await query("DELETE FROM notifications WHERE user_id = ?", [userId]);

      const dummyNotifications = [
        [userId, 'pickup', 'Pickup Scheduled', 'Your e-waste pickup has been scheduled for tomorrow at 2:00 PM', false],
        [userId, 'reward', 'Reward Unlocked', "You've earned 250 EcoPoints! Collect more to unlock premium rewards.", false],
        [userId, 'system', 'Welcome to EcoRecycle', 'Thank you for joining our community. Start recycling and earn rewards!', true]
      ];

      for (const notif of dummyNotifications) {
        await query("INSERT INTO notifications (user_id, type, title, message, is_read) VALUES (?, ?, ?, ?, ?)", notif);
      }
      console.log(`Seeded dummy notifications for user ${userId}.`);
    } else {
      console.log("No users found to seed notifications for. Create a user first to see dummy notifications.");
    }

    console.log("Database setup complete.");
  } catch (err) {
    console.error("Setup failed:", err);
  } finally {
    db.end();
  }
};

setup();
