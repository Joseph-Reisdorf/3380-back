import db from "../database.mjs";

// This is the controller for the POST /persons route
export const addTrack = (req, res) => {
    // need to be a transaction add a track file and a song to album song
    const { 
        track_primary_artist_id, 
        track_name, 
        track_genre, 
        track_release_date,
        track_album_id 
    } = req.body;

    const track_file = req.file.buffer;

    console.log(req.body);

    db.getConnection((err, db) => {
        if (err) {
            console.log("Error getting connection");
            return res.status(500).send("Error adding track");
        }

        db.beginTransaction((err) => {
            if (err) {
                db.release();
                console.log("Error beginning transaction");
                return res.status(500).send("Error adding track");
            }

            // add as track ----------------------
            const track_values = [
                track_primary_artist_id,
                track_name,
                track_release_date,
                track_file,
                track_genre
            ];
            const track_query = "INSERT INTO track (track_primary_artist_id, track_name, track_release_date, track_file, track_genre) VALUES (?, ?, ?, ?, ?)";
            db.query(track_query, track_values, (err, result) => {
                if(err) {
                    return db.rollback(() => {
                        db.release();
                        console.log(err);
                        return res.status(500).send(err);
                    });
                }

                // add to album_song ----------------------
                const album_song_values = [
                    track_album_id,
                    result.insertId
                ];
                const album_song_query = "INSERT INTO album_song (album_song_album_id, album_song_track_id) VALUES (?, ?)";
                db.query(album_song_query, album_song_values, (err, result) => {
                    if(err) {
                        return db.rollback(() => {
                            db.release();
                            console.log(err);
                            return res.status(500).send(err);
                        });
                    }

                    db.commit((err) => {
                        if (err) {
                            return db.rollback(() => {
                                db.release();
                                console.log(err);
                                return res.status(500).send(err);
                            });
                        }
                        db.release();
                        return res.json({ message: "Track added successfully" });
                    });
                });
            });
        });
    });

};

/*
CREATE TABLE IF NOT EXISTS Online_Music_Library.track (
  track_id 					INT 		NOT NULL 	AUTO_INCREMENT,
  track_primary_artist_id 	INT 		NOT NULL,
  track_name				VARCHAR(50) NOT NULL,
  track_release_date 		TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  track_file 				BLOB NOT 	NULL,
  track_genre 					INT 	NULL,
  
  PRIMARY KEY (track_id, track_primary_artist_id))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS Online_Music_Library.album_song (
  album_song_album_id INT NOT NULL,
  album_song_track_id INT NOT NULL,

  PRIMARY KEY (album_song_album_id, album_song_track_id),

  CONSTRAINT album_song_album_id_constraint
    FOREIGN KEY (album_song_album_id)
    REFERENCES Online_Music_Library.album (album_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

  CONSTRAINT album_song_track_id_constraint
    FOREIGN KEY (album_song_track_id)
    REFERENCES Online_Music_Library.track (track_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;
*/