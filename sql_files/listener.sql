-- -----------------------------------------------------
-- Table `Online_Music_Library`.`listener`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Online_Music_Library.listener (
  listener_id 				INT 		NOT NULL,
  listener_username 		VARCHAR(45) NOT NULL,
  listener_is_artist 		BOOLEAN 	NOT NULL,
  listener_online_status	BOOLEAN 	NOT NULL,
-- listener_pfp				BLOB		NULL, might add back later
  
  PRIMARY KEY (listener_id),
  
  CONSTRAINT listener_id_constraint
    FOREIGN KEY (listener_id)
    REFERENCES Online_Music_Library.person (person_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

-- Constraints in other tables --

-- Artist: inherits artist_id from listener_id, 1:1 relationship

-- add dummy data
--INSERT INTO Online_Music_Library.listener (listener_id, listener_username, listener_is_artist, listener_online_status) 
--VALUES (1, 'user1', 1, 1),
--       (2, 'user2', 1, 1);
