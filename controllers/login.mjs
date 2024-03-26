import db from "../database.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


// This is the controller for the POST /login route
export const login = async (req, res) => {
    //console.log("Responding to POST /login")
    const username = req.body.username;
    const password = req.body.password;

    const q = "SELECT * FROM person WHERE person_email = ?";

    db.query(q, [username], (err, data) => {
        if (err) {
            res.send("Database error: " + err);
            return res.status(500).send("Database error");
        }

        if (data.length === 0) {
            return res.status(401).send("Incorrect username and/or password!");
        }

        const user = data[0]; // got user, now check password

        if (data.length > 0) {
            bcrypt.compare(password, user.person_hashed_password, (err, result) => {
                if (err) {
                    res.send("Error: " + err);
                    return res.status(500).send("bcrypt error");
                }

                if (result) {
                    const token = jwt.sign({ id: user.person_id, role: user}, "tempsecret", {
                        // set token to expire in 2 hours
                        expiresIn: 7200
                    });
                    req.session.user_id = user.person_id;
                    req.session.role = user.person_role;
                    console.log("Session: " + req.session.user_id + " " + req.session.role);
                    req.session.user = result;
                    res.json({ auth: true, token: token, result: result });

                }
                else {
                    res.status(401).send("Incorrect username and/or password!");
                }
            });
        } 
    });
};