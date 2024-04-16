import db from "../database.mjs";

// Get new notifications for a listener
export const getNewNotifications = (req, res) => {
  // Query to select new notifications
  const sql = `
    SELECT * 
    FROM notification
    WHERE listener_id = ? 
      AND is_sent = FALSE
  `;

  // Execute query
  db.query(sql, [req.query.listenerId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal server error');
    }
    res.json(results);
  });
};