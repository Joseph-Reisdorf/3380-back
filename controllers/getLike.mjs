import db from "../database.mjs";

export const getLike = (req, res) => {
    const { listener_id, album_id } = req.query;
    const q = "SELECT * FROM album_like WHERE listener_id = ? AND album_id = ?";
  
    db.query(q, [listener_id, album_id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json(data);
    });
};
