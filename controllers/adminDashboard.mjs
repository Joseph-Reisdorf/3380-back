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
  
      // First transaction to delete follow records and the artist
      const q1 = `
          START TRANSACTION;
          DELETE FROM follow WHERE artist_id = ?;
          DELETE FROM artist WHERE artist_id = ?;
          COMMIT;
      `;
  
      // Second transaction to delete albums associated with the artist
      const q2 = `
          START TRANSACTION;
          DELETE artist, album
          FROM artist
          LEFT JOIN album ON artist.artist_id = album.album_primary_artist_id
          WHERE artist.artist_id = ?;
          COMMIT;
      `;
  
      // Execute the first transaction
      db.query(q1, [artistId, artistId], (err1, data1) => {
          if (err1) {
              console.error("Error deleting artist and follow records:", err1);
              return res.status(500).json({ error: "Internal server error" });
          }
  
          // Execute the second transaction
          db.query(q2, [artistId], (err2, data2) => {
              if (err2) {
                  console.error("Error deleting artist and associated albums:", err2);
                  return res.status(500).json({ error: "Internal server error" });
              }
              
              return res.json({ success: true });
          });
      });
  };
  
