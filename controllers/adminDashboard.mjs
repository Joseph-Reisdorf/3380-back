import db from "../database.mjs";

export const getArtists = (req, res) => {
    const q = "SELECT * FROM artist";
  
    db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json(data);
    });
  };

export const getListeners = (req, res) => {
    const q = "SELECT * FROM listener WHERE listener_is_artist = 0";
    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json(data);
      });
    };

    export const delArtists = (req, res) => {
      const artistId = req.params.artist_id; // Get artist ID from URL params
  
      // Assuming other parameters are sent in the request body
      const { artist_display_name, artist_registration_date, artist_biography, follow_count } = req.body;
  
      const q = "DELETE FROM artist WHERE artist_id = ?";
      db.query(q, [artistId], (err, data) => {
          if (err) {
              console.error("Error deleting artist:", err);
              return res.status(500).json({ error: "Internal server error" });
          }
          return res.json(data);
      });
  };

