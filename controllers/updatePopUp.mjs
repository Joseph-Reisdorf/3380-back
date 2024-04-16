import db from "../database.mjs";
export const updatePopUp = async (req, res) => {
    db.getConnection((err, db) => {
        if (err) {
            console.log("Error getting connection");
            return res.status(500).send("Error registering person");
        }
    }); 
}

//UPDATE `online_music_library`.`artist` SET `notify_artist` = '0' WHERE (`artist_id` = '17');
