import db from "../database.mjs";

export const addPlaylist = (req, res) => {
  const { playlist_name, listener_id } = req.body;
  const q = "INSERT INTO playlist (playlist_name, playlist_listener_id) VALUES (?, ?)";


  db.query(q, [playlist_name, listener_id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json({ message: "Playlist added" });
  });
}

export const addTrack = (req, res) => {
  const { playlist_id, track_id } = req.params;
  console.log(req.params);
  const q = "INSERT INTO playlist_song (playlist_song_playlist_id, playlist_song_track_id) VALUES (?, ?)";

  db.query(q, [playlist_id, track_id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json({ message: "Track added to playlist" });
  });
}

export const removeTrack = (req, res) => {
  const { playlist_id, track_id } = req.params;
  const q = "DELETE FROM playlist_song WHERE playlist_song_playlist_id = ? AND playlist_song_track_id = ?";

  db.query(q, [playlist_id, track_id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json({ message: "Track removed from playlist" });
  });
} 
