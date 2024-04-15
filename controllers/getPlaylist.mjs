import db from "../database.mjs";

export const getPlaylist = (req, res) => {
  const q = "SELECT * FROM playlist";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
}

export const searchPlaylistByName = (req, res) => {
  const { playlist_name } = req.query;
  const q = "SELECT * FROM playlist WHERE playlist_name LIKE ?";

  db.query(q, [`%${playlist_name}%`], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
}

export const getPlaylistByListenerId = (req, res) => {
  const listener_id = req.params.listener_id;
  const q = "SELECT * FROM playlist WHERE playlist_listener_id = ?";

  db.query(q, [listener_id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
}

export const getTracksByPlaylistId = (req, res) => {
  const playlist_id = req.params.playlist_id;
  const q = `
    SELECT track_id, track_name
    FROM track, playlist_song
    WHERE track.track_id = playlist_song.playlist_song_track_id
    AND playlist_song.playlist_song_playlist_id = ?
  `;

  db.query(q, [playlist_id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
}