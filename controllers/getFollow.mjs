import db from "../database.mjs";

export const getFollow = (req, res) => {
    const { listener_id, artist_id } = req.query;
    const q = "SELECT * FROM follow WHERE listener_id = ? AND artist_id = ?";
  
    db.query(q, [listener_id, artist_id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json(data);
    });
};
