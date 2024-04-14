import db from "../database.mjs";

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