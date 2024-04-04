import db from "../database.mjs";

// Get playlist by its id
export const getPlaylistById = (req, res) => {
  const playlist_id = req.params.playlist_id;
  const q = "SELECT * FROM playlist WHERE playlist_id=?";

  db.query(q, [playlist_id], (err, data) => {
    if (err) return res.status(500).json(err);
    
    if (data.length === 0) {
      return res.status(404).json({ message: "Playlist not found" });
    };

    return res.json(data[0]);
  });
};

// Get all playlists
export const getPlaylists = (req, res) => {
  const q = "SELECT * FROM playlist";

  db.query(q, (err, playlists) => {
    if (err) return res.status(500).json(err);
    if (playlists.length === 0) {
      return res.status(404).json({ message: "No playlists found" });
    };
    return res.json(playlists);
  });
};