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
            SELECT 
              t.track_id, 
              t.track_name,
              t.track_genre,
              t.track_release_date,
              g.genre_name, 
              t.track_primary_artist_id,
              a.artist_display_name
            FROM 
              track t
            JOIN 
              playlist_song ps ON t.track_id = ps.playlist_song_track_id
            LEFT JOIN 
              genre g ON t.track_genre = g.genre_id
            LEFT JOIN 
              artist a ON t.track_primary_artist_id = a.artist_id
            WHERE 
              ps.playlist_song_playlist_id = ?;
  `;

  db.query(q, [playlist_id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
}