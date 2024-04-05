import db from "../database.mjs";

export const getGenre = (req, res) => {
    const q = "SELECT * FROM genre";
  
    db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
      
      if (data.length === 0) {
        return res.status(404).json({ message: "No genre" });
      };
  
      return res.json(data);
    });
  };

  