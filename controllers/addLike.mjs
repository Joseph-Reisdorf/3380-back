import db from "../database.mjs";

export const addLike = (req, res) => {

    const values = [
        req.body.listener_id,
        req.body.album_id,
    ]

    const q = "INSERT INTO album_like (listener_id, album_id) VALUES (?)";

    db.query(q, [values], (err, data) => {
        if (err) throw err;

        res.json(data);
    });
};

