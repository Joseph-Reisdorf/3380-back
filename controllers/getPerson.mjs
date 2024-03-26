import db from "../database.mjs";

// getPersonById (can be person_id, listener_id, or artist_id -> 1:1:1 relationship)
export const getPersonById = (req, res) => {
  const person_id = req.params.person_id;
  const q = "SELECT * FROM person WHERE person_id=?";

  db.query(q, [person_id], (err, data) => {
    if (err) return res.status(500).json(err);
    
    if (data.length === 0) {
      return res.status(404).json({ message: "Person not found" });
    };

    return res.json(data[0]);
  });
};



// getPeople (all people)
export const getPeople = (req, res) => {
  const q = "SELECT * FROM person";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    
    if (data.length === 0) {
      return res.status(404).json({ message: "No people found" });
    };

    return res.json(data);
  });
};
