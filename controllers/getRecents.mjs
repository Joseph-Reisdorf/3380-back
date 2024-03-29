import db from "../database.mjs";

export const getRecents = (req, res) => {
    const listen_to_datetime = req.params.listen_to_datetime;
    const today = new Date().toISOString().slice(0, 10); // Get today's date in the format YYYY-MM-DD
    const q = "SELECT * FROM listen_to WHERE DATE(listen_to_datetime) = ?";
    db.query(q, [today], (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }
        if (data.length === 0) {
            return res.status(404).json({ message: "There are no tracks listened to recently from today." });
        }
        return res.status(200).json(data); // Assuming data is an array of recent tracks
    });
};