import db from "../database.mjs";

// get all albums
export const getLibrary = (req, res) => {
  const q = "SELECT * FROM track";

  db.query(q, (err, library) => {
    if (err) return res.status(500).json(err);
    if (library.length === 0) {
      return res.status(404).json({ message: "no tracks found!" });
    };
    return res.json(library);
  });
};