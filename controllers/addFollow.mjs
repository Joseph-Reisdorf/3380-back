import db from "../database.mjs";

export const addFollow = (req, res) => {

    const values = [
        req.body.artist_like_listener_id,
        req.body.artist_like_artist_id,
    ]

    const q = "INSERT INTO artist_like (artist_like_listener_id, artist_like_artist_id) VALUES (?)";

    db.query(q, [values], (err, data) => {
        if (err) throw err;

        res.json(data);
    });
};