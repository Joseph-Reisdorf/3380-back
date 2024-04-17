// Used to be ListenTo.mjs 
import db from "../database.mjs";

export const getMostListenedSongsByGenre = (req, res) => {
  const { genre } = req.query;

  const query = `
    SELECT t.track_id, t.track_name, COUNT(l.listen_to_id) AS listen_count
    FROM Online_Music_Library.listen_to l
    JOIN Online_Music_Library.track t ON l.listen_to_track_id = t.track_id
    WHERE t.track_genre = ?
    GROUP BY t.track_id, t.track_name
    ORDER BY listen_count DESC
    LIMIT 5;
  `;

  db.query(query, [genre], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
};
