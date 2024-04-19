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
