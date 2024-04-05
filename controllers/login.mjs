import db from "../database.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// This is the controller for the POST /login route
export const login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const q = `
        SELECT person.*, listener.listener_id 
        FROM Online_Music_Library.listener 
        LEFT JOIN Online_Music_Library.person ON listener.listener_id = person.person_id
        WHERE person.person_email = ?
    `;

    db.query(q, [username], (err, data) => {
        if (err) {
            console.error("Database error: ", err);
            return res.status(500).send("Database error");
        }

        if (data.length === 0) {
            return res.status(401).send("Incorrect username and/or password!");
        }

        const user = data[0]; // got user, now check password

        bcrypt.compare(password, user.person_hashed_password, (err, result) => {
            if (err) {
                console.error("Bcrypt error: ", err);
                return res.status(500).send("bcrypt error");
            }

            if (result) {
                const token = jwt.sign({ 
                    id: user.person_id, 
                    role: user.person_role,
                    listener_id: user.listener_id
                }, process.env.JWT_SECRET, {
                    // set token to expire in 2 hours
                    expiresIn: 7200
                });

                console.log("Session: " + user.person_id + " " + user.person_role);

                res.json({ auth: true, token: token });
            } else {
                res.status(401).send("Incorrect username and/or password!");
            }
        });
    });
};
