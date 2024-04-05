-- -----------------------------------------------------
-- Table `Online_Music_Library`.`artist`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Online_Music_Library.artist (
  artist_id 				INT 			NOT NULL,
  artist_display_name 		VARCHAR(45) 	NOT NULL,
  artist_registration_date 	  TIMESTAMP 	NOT NULL DEFAULT CURRENT_TIMESTAMP,
  artist_biography 			TEXT	 		NULL,
  follow_count      INT       NOT NULL DEFAULT 0;
  PRIMARY KEY (artist_id),
  
  CONSTRAINT artist_id_constraint
    FOREIGN KEY (artist_id)
    REFERENCES Online_Music_Library.listener (listener_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- ALTER TABLE Online_Music_Library.artist
-- ADD COLUMN follow_count INT NOT NULL DEFAULT 0;
-- REQUIRED ^^^

-- Constraints in other tables --

-- Track: inherits track_primary_artist_id from artist_id, 1:1 relationship

