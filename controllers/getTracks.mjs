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
    const q = `SELECT track_id, track_release_date, track_name, artist_display_name 
               FROM track, artist
               WHERE track_primary_artist_id = artist_id`;
    
    db.query(q, (err, tracks) => {
        if (err) return res.status(500).json(err);
        if (tracks.length === 0) {
            return res.status(404).json({ message: "No tracks found" });
        };
        return res.json(tracks);
    });
};

export const deleteTrack = (req, res) => {
    const track_id = req.params.track_id;
    const q = "DELETE FROM track WHERE track_id = ?";
    db.query(q, [track_id], (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Track not found" });
        };
        return res.json({ message: "Track deleted successfully" });
    });
};

export const getLikedTracks = (req, res) => {
    const listener_id = req.params.listener_id;
    const q = `
      SELECT track_id, track_name, track_genre, track_release_date
      FROM track, track_like
      WHERE track.track_id = track_like.track_like_track_id
      AND track_like_listener_id = ?
    `;

    db.query(q, [listener_id], (err, tracks) => {
        if (err) return res.status(500).json(err);
        if (tracks.length === 0) {
            return res.status(404).json({ message: "No liked tracks found" });
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

export const getTracksByListenTo = (req, res) => {
    const listener_id = req.params.listener_id;
    const q = `
      SELECT t.track_id, t.track_name, t.track_genre, t.track_release_date, l.listen_to_datetime
      FROM track as t
      JOIN listen_to as l ON t.track_id = l.listen_to_track_id
      WHERE l.listen_to_listener_id = ?
    `;

    db.query(q, [listener_id], (err, tracks) => {
        if (err) return res.status(500).json(err);
        if (tracks.length === 0) {
            return res.status(404).json({ message: "No tracks found for this listener" });
        };
        return res.json(tracks);
    });
}


