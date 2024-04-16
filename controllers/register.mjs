import db from "../database.mjs";
import bcrypt from "bcrypt";

const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;

// get domain from email
function getDomain(email) {
    return email.split("@")[1];
}

// validate email
function validateEmail(email) {
    const domain = getDomain(email);

    const validDomains = ["gmail.com", 
                          "uh.edu", 
                          "cougarnet.uh.edu", 
                          "yahoo.com", 
                          "outlook.com", 
                          "hotmail.com",
                          "company.com"];
    
    return validDomains.includes(domain);
}

function isArtist(email) {
    const domain = getDomain(email);

    const artistDomains = ["uh.edu", 
                           "cougarnet.uh.edu"];

    return artistDomains.includes(domain);
}



// This is the controller for the POST /register route
export const register = async (req, res) => {
    //console.log("Responding to POST /register")

    const validEmail = validateEmail(req.body.email);
    const isArtistBool = isArtist(req.body.email);
    const isEmployee = isEmployee(req.body.email);

    if (!validEmail) {
        return res.status(400).send("Invalid email domain");
    }

    // quereies for person, listener, and artist
    const person_query = "INSERT INTO person (person_first_name, person_middle_initial, person_last_name, person_email, person_birthdate, person_hashed_password, person_role) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const listener_query = "INSERT INTO listener (listener_id, listener_username, listener_is_artist, listener_online_status) VALUES (?, ?, ?, ?)";
    const artist_query = "INSERT INTO artist (artist_id, artist_display_name, artist_biography) VALUES (?, ?, ?)";
    

    
    const person_values = [
        req.body.first_name,
        req.body.middle_initial,
        req.body.last_name,
        req.body.email,
        req.body.birthdate,
        req.body.password,
        isArtistBool ? 'a' : 'l', 
    ];

    
    db.getConnection((err, db) => {
        if (err) {
            console.log("Error getting connection");
            return res.status(500).send("Error registering person");
        }

        // hash password
        bcrypt.hash(person_values[5], saltRounds, (err, hash) => {
            if (err) {
                db.release();
                console.log("Error hashing password");
                return res.status(500).send("Error registering person");
            }
            person_values[5] = hash; // replace password with hash
            
            db.beginTransaction((err) => {
                if (err) {
                    db.release();
                    console.log("Error beginning transaction");
                    return res.status(500).send("Error registering person");
                }

                // add as person ----------------------
                db.query(person_query, person_values, (err, result) => {
                    if(err) {
                        return db.rollback(() => {
                            db.release();
                            console.log(err);
                            return res.status(500).send(err);
                        });
                    }

                    const personId = result.insertId; // get for next two transactions

                    // add as listener ----------------------
                    const listener_values = [
                        personId,
                        req.body.username,
                        isArtistBool ? 1 : 0, // set to 1 if artist, 0 if listener
                        0 // set online status to offline 0
                    ];

                    db.query(listener_query, listener_values, (err, result) => {
                        if(err) {
                            return db.rollback(() => {
                                db.release();
                                console.log(concat("Error inserting listener:", err));
                                return res.status(500).send(concat("Error inserting listener:", err));
                            });
                        }


                        // add as artist ---------------------- only if vaild email domain
                        if (isArtistBool) {
                            console.log("Adding artist");
                            const artist_values = [
                                personId,
                                req.body.username, // default artist name is username
                                "Bio not set"
                            ];
                            db.query(artist_query, artist_values, (err, result) => {
                                if(err) {
                                    return db.rollback(() => {
                                        db.release();
                                        console.log("Error inserting artist");
                                        return res.status(500).send("Error registering artist");
                                    });
                                }

                            });

                            // commit transaction
                            db.commit((err) => {
                                if(err) {
                                    return db.rollback(() => {
                                        db.release();
                                        console.log("Error committing transaction");
                                        return res.status(500).send("Error registering person");
                                    });
                                }
                                db.release();
                                res.status(201).send("Person registered");
                            });
                        } // add artist release
                        else { // commit transaction if not artist
                            console.log("Not an artist");
                            db.commit((err) => {
                                if(err) {
                                    return db.rollback(() => {
                                        db.release();
                                        console.log("Error committing transaction");
                                        return res.status(500).send("Error registering person");
                                    });
                                }
                                db.release();
                                res.status(201).send("Person registered");
                            });
                        }
                    }); // listener query release
                    // else employee || admin


                }); // person query release
            });  // transaction release
        }); // end hash password
    }); 
}; // end register function