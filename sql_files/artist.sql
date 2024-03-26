-- -----------------------------------------------------
-- Table `Online_Music_Library`.`artist`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Online_Music_Library.artist (
  artist_id 				INT 			NOT NULL,
  artist_display_name 		VARCHAR(45) 	NOT NULL,
--  artist_email	 			VARCHAR(100) 	NOT NULL,
  artist_registration_date 	  TIMESTAMP 	NOT NULL DEFAULT CURRENT_TIMESTAMP,
-- artist_pfp 	      BLOB 			NULL, - might add back later
  artist_biography 			TEXT	 		NULL,

  PRIMARY KEY (artist_id),
  
  CONSTRAINT artist_id_constraint
    FOREIGN KEY (artist_id)
    REFERENCES Online_Music_Library.listener (listener_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- Constraints in other tables --

-- Track: inherits track_primary_artist_id from artist_id, 1:1 relationship

