// Import the database connection
import db from "../database.mjs";

// Controller for creating a new playlist
export const addPlaylist = (req, res) => {
    // Extract data from the request body
    const { listener_id, name } = req.body;

    // SQL query to insert a new playlist
    const query = "INSERT INTO playlist (playlist_listener_id, playlist_name) VALUES (?, ?)";

    // Values to be inserted into the database
    const values = [listener_id, name];

    // Execute the query
    db.query(query, values, (err, result) => {
        if (err) {
            console.error("Error adding playlist:", err);
            res.status(500).json({ error: "Failed to add playlist" });
        } else {
            console.log("Playlist added successfully");
            res.status(200).json({ message: "Playlist added successfully" });
        }
    });
};
