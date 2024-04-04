-- -----------------------------------------------------
-- Table `Online_Music_Library`.`track`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Online_Music_Library.track (
  track_id 					INT 		NOT NULL 	AUTO_INCREMENT,
  track_primary_artist_id 	INT 		NOT NULL,
  track_name				VARCHAR(50) NOT NULL,
  track_file 				BLOB NOT 	NULL,
 
  
  PRIMARY KEY (track_id, track_primary_artist_id))
ENGINE = InnoDB;









