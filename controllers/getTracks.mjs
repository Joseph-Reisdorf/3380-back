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