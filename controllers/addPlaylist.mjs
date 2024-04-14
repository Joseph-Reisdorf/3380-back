import db from "../database.mjs";

export const addPlaylist = (req, res) => {
  const { playlist_name, listener_id } = req.body;
  const q = "INSERT INTO playlist (playlist_name, playlist_listener_id) VALUES (?, ?)";


  db.query(q, [playlist_name, listener_id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json({ message: "Playlist added" });
  });
}
