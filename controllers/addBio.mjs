import db from "../database.mjs";

export const addBio = (req, res) => {
    const artistId = req.params.artist_id;
    const { artist_biography } = req.body;
    const query = "UPDATE artist SET artist_biography = ? WHERE artist_id = ?";
    db.query(query, [artist_biography, artistId], (err, data) => {
        if (err) {
            console.error('Error getting bio...' + err.stack);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        res.json({data});
    });
};
