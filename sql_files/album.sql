-- -----------------------------------------------------
-- Table Online_Music_Library.album
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Online_Music_Library.album (
  album_id 				INT NOT NULL AUTO_INCREMENT,
  album_primary_artist_id INT NOT NULL,
  album_title 			VARCHAR(80) NOT NULL,
  album_release_date 		TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  album_description 		TEXT	 NULL,
  album_cover_art BLOB NULL,
--  album_genre INT NOT NULL, might add back later
  
  PRIMARY KEY (album_id),

  CONSTRAINT album_artist_listener_id_constraint
    FOREIGN KEY (album_primary_artist_id)
    REFERENCES Online_Music_Library.artist (artist_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- dummy data for album table
--INSERT INTO Online_Music_Library.album (album_primary_artist_id, album_title, album_release_date, album_description)
--VALUES (1, 'The Dark Side of the Moon', '1973-03-01', 'The Dark Side of the Moon is the eighth studio album by the English rock band Pink Floyd, released on 1 March 1973 by Harvest Records.');