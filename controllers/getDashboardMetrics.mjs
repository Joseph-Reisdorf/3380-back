import db from "../database.mjs";

export const getAgeData = (req, res) => {
    const artist_id = req.params.artist_id;
    const q =  `SELECT COUNT( *), FLOOR(DATEDIFF(CURRENT_DATE(), person_birthdate) / 365.25) AS listener_age
    FROM artist, follow, listener, person
    WHERE 
        artist.artist_id = follow.artist_id
        AND listener.listener_id = follow.listener_id
        AND listener.listener_id = person.person_id
        AND artist.artist_id = 8
        group by listener_age `;
  
    db.query(q, [artist_id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) {
        return res.status(404).json({ message: "Artist not found" });
      };
      return res.json(data);
    });
  };