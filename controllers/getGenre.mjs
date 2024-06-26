// Import the database connection
import db from "../database.mjs";

// Get genre name by ID
export const getGenreNameById = (req, res) => {
  const genreId = req.params.genreId;
  const query = "SELECT genre_name FROM genre WHERE genre_id = ?";

  db.query(query, [genreId], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length === 0) {
      return res.status(404).json({ message: "Genre not found" });
    }

    return res.json(data[0].genre_name);
  });
};

// Get all genres
export const getGenres = (req, res) => {
  const query = "SELECT * FROM genre";

  db.query(query, (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length === 0) {
      return res.status(404).json({ message: "No genres found" });
    }

    return res.json(data);
  });
};

// Get all genre names
export const getAllGenreNames = (req, res) => {
  const query = "SELECT genre_name FROM genre";

  db.query(query, (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length === 0) {
      return res.status(404).json({ message: "No genres found" });
    }

    const genreNames = data.map((genre) => genre.genre_name);
    return res.json(genreNames);
  });
};

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


export const getMostListenedSongsByGenre = (req, res) => {
  const { selectedGenre, startDate, endDate } = req.query;


  const values = [selectedGenre, startDate, endDate];

  console.log(values);
  const query = `
    SELECT t.track_id, t.track_name, COUNT(l.listen_to_id) AS listen_count
    FROM Online_Music_Library.listen_to l
    JOIN Online_Music_Library.track t ON l.listen_to_track_id = t.track_id
    WHERE t.track_genre = ? AND l.listen_to_datetime >= ? AND l.listen_to_datetime <= ?
    GROUP BY t.track_id, t.track_name
    ORDER BY listen_count DESC
    LIMIT 5;
  `;

  db.query(query, values, (err, data) => {
    if (err) return res.status(500).json(err);
    console.log(data)
    return res.json(data);
  });
};