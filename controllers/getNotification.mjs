import db from "../database.mjs";

// Get new notifications for a listener
export const getNewNotifications = (req, res) => {
  // Query to select new notifications

  const id = req.params.person_id;

  const sql = `
    SELECT * 
    FROM notification
    WHERE listener_id = ? 
      AND is_sent = FALSE
  `;

  // Execute query
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal server error');
    }
    if (results.length === 0) {
      return res.status(404).send('No new notifications');
    }
    res.json(results);
  });
};