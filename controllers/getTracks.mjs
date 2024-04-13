import db from "../database.mjs";

// Function to get track blob data by track ID
export const getTrackBlob = (req, res) => {
    const trackId = req.params.trackId;

    // Query to fetch track blob data based on track ID
    const q = "SELECT track_file FROM track WHERE track_id = ?";

    db.query(q, [trackId], (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.length === 0 || !result[0].track_file) {
            return res.status(404).json({ message: "Track blob not found" });
        }

        // Send the track blob data as response
        const trackFile = result[0].track_file;
        res.setHeader('Content-Type', 'audio/mpeg');
        res.send(Buffer.from(trackFile, 'base64')); // Assuming track_file is base64 encoded
    });
};



// Function to get all tracks
export const getTracks = (req, res) => {
    const q = "SELECT track_id, track_primary_artist_id, track_name FROM track";
    
    db.query(q, (err, tracks) => {
        if (err) return res.status(500).json(err);
        if (tracks.length === 0) {
            return res.status(404).json({ message: "No tracks found" });
        };
        return res.json(tracks);
    });
};

export const getTracksByAlbumId = (req, res) => {
    const album_id = req.params.album_id;
    const q = `
      SELECT t.track_id, t.track_name, t.track_genre, t.track_release_date
      FROM album_song as a
      JOIN track as t ON t.track_id = a.album_song_track_id
      WHERE a.album_song_album_id = ?
    `;

    db.query(q, [album_id], (err, tracks) => {
        if (err) return res.status(500).json(err);
        if (tracks.length === 0) {
            return res.status(404).json({ message: "No tracks found for this album" });
        };
        return res.json(tracks);
    });
}