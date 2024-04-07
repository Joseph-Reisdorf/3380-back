import db from "../database.mjs";

export const getBiography = (req, res) => {
    console.log("hello");
    const artistId = req.params.artist_id; 

    const query = "SELECT artist_display_name, artist_biography, follow_count FROM artist WHERE artist_id = ?";

    db.query(query, [artistId], (err, results) => {
        if (err) {
            console.error('Error fetching biography: ' + err.stack);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        if (results.length === 0) {
            res.status(404).json({ error: 'Artist not found' });
            return;
        }

        const biography = results[0].artist_biography;
        res.json({ biography });
    });
};
