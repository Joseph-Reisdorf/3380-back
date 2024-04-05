-- -----------------------------------------------------
-- Table `Online_Music_Library`.`person`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Online_Music_Library.person (
  person_id 				INT 		NOT NULL 	AUTO_INCREMENT,
  person_first_name 			VARCHAR(45) 	NOT NULL,
  person_middle_initial 		VARCHAR(1) 	NULL,
  person_last_name	 		VARCHAR(45) 	NOT NULL,
  person_email	 			VARCHAR(90) 	NOT NULL	UNIQUE,
  person_registration_date	 	TIMESTAMP 	NOT NULL
						DEFAULT  		CURRENT_TIMESTAMP,
  person_update_date			TIMESTAMP	NOT NULL	
						DEFAULT			CURRENT_TIMESTAMP
						ON UPDATE		CURRENT_TIMESTAMP,
  person_birthdate	 		DATE 		NOT NULL,
  person_hashed_password		VARCHAR(100) 	NOT NULL,
	person_role       VARCHAR(1) 		NOT NULL,
    PRIMARY KEY (person_id))
ENGINE = InnoDB;

-- Constraints in other tables --

-- Listener: inherits listener_id from person_id, 1:1 relationship
