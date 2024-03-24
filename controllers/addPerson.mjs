import db from "../database.mjs";

// This is the controller for the POST /persons route
export const addPerson = (req, res) => {
    //console.log("Responding to POST /persons")

    const values = [
        req.body.first_name,
        req.body.middle_initial,
        req.body.last_name,
        req.body.email,
        req.body.birthdate,
        req.body.password
    ]

    const q = "INSERT INTO person (person_first_name, person_middle_initial, person_last_name, person_email, person_birthdate, person_hashed_password) VALUES (?)";

    db.query(q, [values], (err, data) => {
        if (err) throw err;

        res.json(data);
    });
};