// Used to be ListenTo.mjs 
import db from "../database.mjs";

export const getMostListenedGenres = (req, res) => {
  const { startDate, endDate } = req.query;

  const query = `
    SELECT t.track_genre, COUNT(l.listen_to_id) AS listen_count
    FROM Online_Music_Library.listen_to l
    JOIN Online_Music_Library.track t ON l.listen_to_track_id = t.track_id
    WHERE l.listen_to_datetime >= ? AND l.listen_to_datetime <= ?
    GROUP BY t.track_genre
    ORDER BY listen_count DESC;
  `;

  db.query(query, [startDate, endDate], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
};
