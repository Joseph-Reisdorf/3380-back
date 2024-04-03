import db from "../database.mjs";

// This is the controller for the POST /persons route
export const addAlbum = (req, res) => {
    console.log("Responding to POST /persons")

    const { album_primary_artist_id, album_title, album_description, album_release_date, album_cover_art } = req.body;

    if (album_release_date === null) {
        // q & values if release date null
        const values_default_date = [album_primary_artist_id, album_title, album_description, album_cover_art];
        const q_default_date = "INSERT INTO album (album_primary_artist_id, album_title, album_description, album_cover_art) VALUES (?, ?, ?, ?)";

        db.query(q_default_date, values_default_date, (err, data) => {
            if (err) throw err;
    
            res.json(data);
        });
    }
    else {
        // not null 
        const values = [album_primary_artist_id, album_title, album_release_date, album_description, album_cover_art];
        const q = "INSERT INTO album (album_primary_artist_id, album_title, album_release_date, album_description, album_cover_art) VALUES (?, ?, ?, ?, ?)";   
        
        db.query(q, values, (err, data) => {
            if (err) throw err;
    
            res.json(data);
        });
    }


    /*
    const values = [
        req.body.album_primary_artist_id,
        req.body.album_title,
        req.body.album_release_date,
        req.body.album_description,
        req.body.album_cover_art
    ]

    const q = "INSERT INTO album (album_primary_artist_id, album_title, album_release_date, album_description, album_cover_art) VALUES (?, ?, ?, ?, ?)";
    */

};