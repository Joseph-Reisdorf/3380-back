import db from "../database.mjs";

export const addBiography = (req, res) => {

    const artistId = req.body.artist_id;
    const biography = req.body.biography;

    const query = "UPDATE artist SET artist_biography = ? WHERE artist_id = ?";

    db.query(query, [biography, artistId], (err, data) => {
        if (err) {
            console.error('Error updating biography: ' + err.stack);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        res.json({data});
    });
};
