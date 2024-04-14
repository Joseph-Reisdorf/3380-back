import db from "../database.mjs";


// Function to like a track
export const trackLike = (req, res) => {
    const trackId = req.params.trackId;
    const userId = req.params.listener_id;

    const q = "INSERT INTO track_like (track_like_listener_id, track_like_track_id) VALUES (?, ?)";
    db.query(q, [userId, trackId], (err, result) => {
        if (err) return res.status(500).json(err);
        return res.json({ message: "Track liked" });
    });
};

// Function to unlike a track
export const trackUnlike = (req, res) => {
    const trackId = req.params.trackId;
    const userId = req.params.listener_id;

    const q = "DELETE FROM track_like WHERE track_like_listener_id = ? AND track_like_track_id = ?";
    db.query(q, [userId, trackId], (err, result) => {
        if (err) return res.status(500).json(err);
        return res.json({ message: "Track unliked" });
    });
};