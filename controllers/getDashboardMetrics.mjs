import db from "../database.mjs";

export const getAgeData = (req, res) => {
    const artist_id = req.params.artist_id;
    const q =  `SELECT COUNT(*) AS count, FLOOR(DATEDIFF(CURRENT_DATE(), person_birthdate) / 365.25) AS listener_age
    FROM artist
    INNER JOIN artist_like ON artist.artist_id = artist_like.artist_like_artist_id
    INNER JOIN listener ON listener.listener_id = artist_like.artist_like_listener_id
    INNER JOIN person ON person.person_id = listener.listener_id
    WHERE artist.artist_id = ?
    GROUP BY listener_age;
     `;

    // const q = `SELECT Count(*) as count, 
    // From artist_like
    // WHERE artist_like_artist_id = ?`
  
    db.query(q, [artist_id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) {
        return res.status(404).json({ message: "Artist not found" });
      };
      return res.json(data);
    });
  };