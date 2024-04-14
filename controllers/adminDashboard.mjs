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
    
        // Delete follow records query
        const deleteFollowQuery = `DELETE FROM follow WHERE artist_id = ?`;
    
        // Delete artist and associated albums query
        const deleteArtistAndAlbumsQuery = `
            DELETE artist, album
            FROM artist
            LEFT JOIN album ON artist.artist_id = album.album_primary_artist_id
            LEFT JOIN person ON artist.artist_id = person.person_id
            WHERE artist.artist_id = ?;
        `;
    
        // Execute the query to delete follow records
        db.query(deleteFollowQuery, [artistId], (err1, data1) => {
            if (err1) {
                console.error("Error deleting follow records:", err1);
                return res.status(500).json({ error: "Internal server error" });
            }
    
            // Execute the query to delete artist and associated albums
            db.query(deleteArtistAndAlbumsQuery, [artistId], (err2, data2) => {
                if (err2) {
                    console.error("Error deleting artist and associated albums:", err2);
                    return res.status(500).json({ error: "Internal server error" });
                }
    
                return res.json({ data1, data2 });
            });
        });
    };

    export const delListeners = (req, res) => {
    const listenerId = req.params.listener_id; // Get listener ID from URL params

    // Delete listener query
    const deleteListenerQuery = 
        `DELETE listener, person
         FROM listener
         LEFT JOIN person ON person.person_id = listener.listener_id
         WHERE listener.listener_id = ?
    `;

    // Execute the query to delete the listener
    db.query(deleteListenerQuery, [listenerId], (err, data) => {
        if (err) {
            console.error("Error deleting listener:", err);
            return res.status(500).json({ error: "Internal server error" });
        }

        return res.json({ data });
    });
};

    
  
