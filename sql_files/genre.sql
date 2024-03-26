-- -----------------------------------------------------
-- Table `Online_Music_Library`.`genre`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Online_Music_Library.genre (
    genre_id 		INT 		NOT NULL	AUTO_INCREMENT,
    genre_name		VARCHAR(50) 	NOT NULL 	UNIQUE,
    
    PRIMARY KEY (genre_id))
ENGINE = InnoDB;

-- Constraints in other tables --

-- Track: inherits track_genre from genre_id, track - genre -> N:1






