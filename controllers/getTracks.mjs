import db from "../database.mjs";

export const getTracks = (req, res) => {
    const q = "SELECT * FROM track";
    
    db.query(q, (err, tracks) => {
        if (err) return res.status(500).json(err);
        if (tracks.length === 0) {
        return res.status(404).json({ message: "No tracks found" });
        };
        return res.json(tracks);
    });
};

export const getTracksByAlbumId = (req, res) => {
    const albumId = req.params.albumId;
    const q = "SELECT t.* FROM track t JOIN album_song a ON t.track_id = a.album_song_track_id WHERE a.album_song_album_id = ?";

    db.query(q, [albumId], (err, tracks) => {
        if (err) return res.status(500).json(err);
        if (tracks.length === 0) {
            return res.status(404).json({ message: "No tracks found for the album" });
        };
        return res.json(tracks);
    });
};