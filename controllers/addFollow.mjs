import db from "../database.mjs";

export const addFollow = (req, res) => {

    const values = [
        req.body.listener_id,
        req.body.artist_id,
    ]

    const q = "INSERT INTO follow (listener_id, artist_id) VALUES (?)";

    db.query(q, [values], (err, data) => {
        if (err) throw err;

        res.json(data);
    });
};

