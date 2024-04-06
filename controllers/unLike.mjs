import db from "../database.mjs";
export const unLike = (req, res) => {
    const listener_id = req.body.listener_id;
    const album_id = req.body.album_id;

    const q = "DELETE FROM album_like WHERE listener_id = ? AND album_id = ?";

    db.query(q, [listener_id, album_id], (err, data) => {
        if (err) throw err;

        res.json(data);
    });
};