
// Used to be Artist.mjs 
import db from "../database.mjs";


export const getArtistById = (req, res) => {
  const artist_id = req.params.artist_id;
  const q = "SELECT * FROM artist WHERE artist_id=?";

  db.query(q, [artist_id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) {
      return res.status(404).json({ message: "Artist not found" });
    };

    // consider to change by not extracting data on this end, can be changed on front end like in getAlbum
    const { artist_display_name, artist_biography } = data[0];
    const artistInfo = { artist_display_name, artist_biography };
    return res.json(artistInfo);
  });
};


export const searchArtistByName = (req, res) => {
  const { artist_display_name } = req.query;
  const q = "SELECT * FROM artist WHERE artist_display_name LIKE ?";

  db.query(q, [`%${artist_display_name}%`], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
};


export const getArtists = (req, res) => {
  const q = "SELECT * FROM artist";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
};