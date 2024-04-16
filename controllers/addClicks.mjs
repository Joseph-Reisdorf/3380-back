import db from "../database.mjs";

export const addClicks = (req, res) => {

    const values = [
        req.body.listen_to_listener_id,
        req.body.listen_to_track_id,
    ]

    const q = "INSERT INTO listen_to (listen_to_listener_id, listen_to_track_id) VALUES (?)";

    db.query(q, [values], (err, data) => {
        if (err) throw err;

        res.json(data);
    });
};