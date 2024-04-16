import db from "../database.mjs";
export const getFollow = (req, res) => {
    const q = "SELECT * FROM artist_like";
  
    db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json(data);
    });
  };
