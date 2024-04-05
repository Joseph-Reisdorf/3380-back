import db from "../database.mjs";
export const unFollow = (req, res) => {
    const listener_id = req.body.listener_id;
    const artist_id = req.body.artist_id;

    const q = "DELETE FROM follow WHERE listener_id = ? AND artist_id = ?";

    db.query(q, [listener_id, artist_id], (err, data) => {
        if (err) throw err;

        res.json(data);
    });
};