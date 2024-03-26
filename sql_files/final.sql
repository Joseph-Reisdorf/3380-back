-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema Online_Music_Library
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS Online_Music_Library;
USE Online_Music_Library;

-- -----------------------------------------------------
-- Table `Online_Music_Library`.`person`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Online_Music_Library.person (
  person_id 					INT 			NOT NULL 	AUTO_INCREMENT,
  person_first_name 			VARCHAR(45) 	NOT NULL,
  person_middle_initial 		VARCHAR(1) 		NULL,
  person_last_name	 			VARCHAR(45) 	NOT NULL,
  person_email	 				VARCHAR(45) 	NOT NULL	UNIQUE,
  -- Maybe implement a phone number --
  person_registration_date	 	TIMESTAMP 		NOT NULL
									DEFAULT  		CURRENT_TIMESTAMP,
  person_update_date			TIMESTAMP		NOT NULL	
									DEFAULT			CURRENT_TIMESTAMP
									ON UPDATE		CURRENT_TIMESTAMP,
  person_birthdate	 			DATE 			NOT NULL,
  person_hashed_password		VARCHAR(100) 	NOT NULL,
  person_address 				VARCHAR(45) 	NULL,
	
    PRIMARY KEY (person_id))
ENGINE = InnoDB;

DROP TABLE person;

-- ------------------------------------------------------------------------------
INSERT INTO Online_Music_Library.person 
(person_first_name, person_middle_initial, person_last_name, person_email, person_registration_date, person_update_date, person_birthdate, person_hashed_password, person_address) 
VALUES 
('John', 'A', 'Doe', 'john.doe@example.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '1980-01-01', 'hashed_password_1', '123 Elm St'),
('Jane', 'B', 'Smith', 'jane.smith@example.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '1985-02-02', 'hashed_password_2', '456 Oak St'),
('Emily', NULL, 'Johnson', 'emily.johnson@example.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '1990-03-03', 'hashed_password_3', '789 Pine St'),
('Michael', 'C', 'Williams', 'michael.williams@example.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '1975-04-04', 'hashed_password_4', '101 Maple St');
select person_first_name
from person
where person_middle_initial is not null;
-- ------------------------------------------------------------------------------


-- -----------------------------------------------------
-- Table `Online_Music_Library`.`listener`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Online_Music_Library.listener (
  listener_id 				INT 		NOT NULL,
  listener_username 		VARCHAR(45) NOT NULL,
  listener_is_artist 		TINYINT(1) 	NOT NULL,
  listener_online_status	TINYINT(1) 	NOT NULL,
  listener_pfp				BLOB		NULL,
  
  PRIMARY KEY (listener_id),
  
  CONSTRAINT listener_id_constraint
    FOREIGN KEY (listener_id)
    REFERENCES Online_Music_Library.person (id)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB;

-- ------------------------------------------------------------------------------
INSERT INTO Online_Music_Library.listener 
(listener_id, listener_username, listener_is_artist, listener_online_status) 
VALUES 
(1, 'JohnDoeMusic', 1, 1),
(2, 'JaneSmithFan', 0, 0),
(3, 'EmJMusic', 1, 1),
(4, 'MikeWPodcasts', 0, 1);
-- ------------------------------------------------------------------------------



-- -----------------------------------------------------
-- Table `Online_Music_Library`.`artist`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Online_Music_Library.artist (
  artist_id 				INT 			NOT NULL 	AUTO_INCREMENT,
  artist_display_name 		VARCHAR(45) 	NOT NULL,
  artist_email	 			VARCHAR(100) 	NOT NULL,
  artist_registration_date 	DATE 			NOT NULL,
  artist_pfp		 		BLOB 			NULL,
  artist_biography 			TEXT	 		NULL,

  PRIMARY KEY (artist_id),
  
  CONSTRAINT artist_id_constraint
    FOREIGN KEY (artist_id)
    REFERENCES Online_Music_Library.listener (listener_id)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Online_Music_Library`.`track`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Online_Music_Library.track (
  track_id 					INT 		NOT NULL 	AUTO_INCREMENT,
  track_primary_artist_id 	INT 		NOT NULL,
  track_name				VARCHAR(50) NOT NULL,
  track_release_date 		TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  track_file 				BLOB NOT 	NULL,
  track_genre 					INT 	NULL,
  
  PRIMARY KEY (track_id, track_primary_artist_id))
ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS Online_Music_Library.genre (
    genre_id 		INT 			AUTO_INCREMENT,
    genre_name		VARCHAR(255) 	NOT NULL 	UNIQUE,
    
    PRIMARY KEY (genre_id))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Online_Music_Library`.`album`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `Online_Music_Library`.`album` (
  `album_id` 				INT NOT NULL AUTO_INCREMENT,
  `album_primary_artist_id` INT NOT NULL,
  `album_title` 			VARCHAR(80) NOT NULL,
  `album_release_date` 		TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `album_description` 		TEXT	 NULL,
  `album_cover_art` BLOB NULL,
  `album_genre` INT NOT NULL,
  PRIMARY KEY (`album_id`),
  
  CONSTRAINT `album_artist_listener_id_constraint`
    FOREIGN KEY (`album_primary_artist_id`)
    REFERENCES `Online_Music_Library`.`artist` (`artist_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Online_Music_Library`.`collaborator`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Online_Music_Library`.`collaborator` (
  `collaborator_track_id` INT NOT NULL,
  `collaborator_artist_id` INT NOT NULL,
  `collaborator_role` SMALLINT NULL,
  PRIMARY KEY (`collaborator_track_id`, `collaborator_artist_id`),

  CONSTRAINT `collaborator_track_id_constraint`
    FOREIGN KEY (`collaborator_track_id`)
    REFERENCES `Online_Music_Library`.`track` (`track_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `collaborator_artist_id_constraint`
    FOREIGN KEY (`collaborator_artist_id`)
    REFERENCES `Online_Music_Library`.`artist` (`artist_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Online_Music_Library`.`playlist`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Online_Music_Library.playlist (
  playlist_id INT NOT NULL AUTO_INCREMENT,
  playlist_listener_id INT NOT NULL,
  playlist_release_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  playlist_name VARCHAR(50) NOT NULL,
  
  PRIMARY KEY (playlist_id),

  CONSTRAINT playlist_listener_id_constraint
    FOREIGN KEY (playlist_listener_id)
    REFERENCES Online_Music_Library.listener (listener_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `Online_Music_Library`.`playlist_song`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Online_Music_Library`.`playlist_song` (
  `playlist_song_playlist_id` INT NOT NULL,
  `playlist_song_track_id` INT NOT NULL,

  PRIMARY KEY (`playlist_song_playlist_id`, `playlist_song_track_id`),

  CONSTRAINT `playlist_song_playlist_id_constraint`
    FOREIGN KEY (`playlist_song_playlist_id`)
    REFERENCES `Online_Music_Library`.`playlist` (`playlist_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    
  CONSTRAINT `playlist_song_track_id_constraint`
    FOREIGN KEY (`playlist_song_track_id`)
    REFERENCES `Online_Music_Library`.`track` (`track_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


  
-- -----------------------------------------------------
-- Table `Online_Music_Library`.`album_song`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Online_Music_Library`.`album_song` (
  `album_song_album_id` INT NOT NULL,
  `album_song_track_id` INT NOT NULL,

  PRIMARY KEY (`album_song_album_id`, `album_song_track_id`),
  INDEX `track_id_idx` (`album_song_track_id` ASC) VISIBLE,

  CONSTRAINT `album_song_album_id_constraint`
    FOREIGN KEY (`album_song_album_id`)
    REFERENCES `Online_Music_Library`.`album` (`album_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `album_song_track_id_constraint`
    FOREIGN KEY (`album_song_track_id`)
    REFERENCES `Online_Music_Library`.`track` (`track_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;




-- -----------------------------------------------------
-- Table `Online_Music_Library`.`track_like`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Online_Music_Library`.`track_like` (
  `track_like_listener_id` INT NOT NULL,
  `track_like_track_id` INT NOT NULL,
  `track_like_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`track_like_listener_id`, `track_like_track_id`),

  CONSTRAINT `track_like_track_id_constraint`
    FOREIGN KEY (`track_like_track_id`)
    REFERENCES `Online_Music_Library`.`track` (`track_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `track_like_listener_id_constraint`
    FOREIGN KEY (`track_like_listener_id`)
    REFERENCES `Online_Music_Library`.`listener` (`listener_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

-- ----------------------------------------------------- Might add back later
-- Table `Online_Music_Library`.`track_comment`
-- -----------------------------------------------------
-- TABLE IF NOT EXISTS `Online_Music_Library`.`track_comment` (
--  `track_comment_id` INT NOT NULL AUTO_INCREMENT,
--  `track_comment_listener_id` INT NOT NULL,
--  `track_comment_track_id` INT NOT NULL,
--  `track_comment_body` TEXT NOT NULL,
--  PRIMARY KEY (`track_comment_id`, `track_comment_listener_id`, `track_comment_track_id`),
--  INDEX `track_id_idx` (`track_comment_track_id` ASC) VISIBLE,
--  INDEX `listener_id_idx` (`track_comment_listener_id` ASC) VISIBLE,
--  CONSTRAINT `track_comment_track_id_constraint`
--    FOREIGN KEY (`track_comment_track_id`)
--    REFERENCES `Online_Music_Library`.`track` (`track_id`)
--    ON DELETE NO ACTION
--    ON UPDATE NO ACTION,
--  CONSTRAINT `track_comment_listener_id_constraint`
--    FOREIGN KEY (`track_comment_listener_id`)
--    REFERENCES `Online_Music_Library`.`listener` (`listener_id`)
--    ON DELETE NO ACTION
--    ON UPDATE NO ACTION)
-- ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table Online_Music_Library.playlist_like
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Online_Music_Library.playlist_like (
  playlist_like_playlist_id INT NOT NULL,
  playlist_like_listner_id INT NOT NULL,
  playlist_like_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  PRIMARY KEY (playlist_like_playlist_id, playlist_like_listner_id),

  CONSTRAINT playlist_like_playlist_id_constraint
    FOREIGN KEY (playlist_like_playlist_id)
    REFERENCES Online_Music_Library.playlist (playlist_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT playlist_like_listener_id_constraint
    FOREIGN KEY (playlist_like_listner_id)
    REFERENCES Online_Music_Library.listener (listener_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `Online_Music_Library`.`listen_to`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Online_Music_Library`.`listen_to` (
  `listen_to_id` INT NOT NULL AUTO_INCREMENT,
  `listen_to_listener_id` INT NOT NULL,
  `listen_to_track_id` INT NOT NULL,
  `listen_to_datetime` DATETIME NOT NULL,
  PRIMARY KEY (`listen_to_id`),
  INDEX `track_id_idx` (`listen_to_track_id` ASC) VISIBLE,
  CONSTRAINT `listen_to_track_id_constraint`
    FOREIGN KEY (`listen_to_track_id`)
    REFERENCES `Online_Music_Library`.`track` (`track_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `listen_to_listener_id_constraint`
    FOREIGN KEY (`listen_to_listener_id`)
    REFERENCES `Online_Music_Library`.`listener` (`listener_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Online_Music_Library`.`department`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Online_Music_Library`.`department` (
  `department_name` VARCHAR(45) NOT NULL,
  `department_id` INT NOT NULL AUTO_INCREMENT,
  `department_employee_manager_id` INT NOT NULL,
  PRIMARY KEY (`department_id`, `department_employee_manager_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Online_Music_Library`.`employee`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Online_Music_Library`.`employee` (
  `employee_id` INT NOT NULL AUTO_INCREMENT,
  `employee_firstname` VARCHAR(45) NOT NULL,
  `employee_lastname` VARCHAR(45) NOT NULL,
  `employee_department` INT NOT NULL,
  PRIMARY KEY (`employee_id`),
  INDEX `department_id_idx` (`employee_department` ASC) VISIBLE,
  CONSTRAINT `employee_department_id_constraint`
    FOREIGN KEY (`employee_department`)
    REFERENCES `Online_Music_Library`.`department` (`department_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Online_Music_Library`.`complaint`
-- -----------------------------------------------------
-- CREATE TABLE IF NOT EXISTS `Online_Music_Library`.`complaint` (
--  `complaint_id` INT NOT NULL AUTO_INCREMENT,
--  `complaint_person_id` INT NOT NULL,
--  `addressed` TINYINT(1) NOT NULL,
--  `complaint_employee_id` INT NOT NULL,
--  `complaint_created` DATE NOT NULL,
--  `complaint_summary` TEXT(5000) NULL,
--  `complaint_documentation` BLOB(500) NULL,
--  `complaint_addressed` TINYINT NOT NULL,
--  `complaint_when_resolved` DATE NULL,
--  `complaintcol` VARCHAR(45) NULL,
--  PRIMARY KEY (`complaint_id`, `complaint_person_id`, `complaint_employee_id`),
--  UNIQUE INDEX `complaint_id_UNIQUE` (`complaint_id` ASC) VISIBLE,
--  INDEX `person_id_idx` (`complaint_person_id` ASC) VISIBLE,
--  INDEX `employee_id_idx` (`complaint_employee_id` ASC) VISIBLE,
--  CONSTRAINT `complaint_person_id_constraint`
--    FOREIGN KEY (`complaint_person_id`)
--    REFERENCES `Online_Music_Library`.`person` (`person_id`)
--    ON DELETE NO ACTION
--   ON UPDATE NO ACTION,
--  CONSTRAINT `complaint_employee_id_constraint`
--    FOREIGN KEY (`complaint_employee_id`)
--    REFERENCES `Online_Music_Library`.`employee` (`employee_id`)
--    ON DELETE NO ACTION
--    ON UPDATE NO ACTION)
-- ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Online_Music_Library`.`record_company`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Online_Music_Library`.`record_company` (
  `record_company_id` INT NOT NULL AUTO_INCREMENT,
  `record_company_name` VARCHAR(45) NOT NULL,
  `record_company_address` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`record_company_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Online_Music_Library`.`record_company_employee`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Online_Music_Library`.`record_company_employee` (
  `record_company_employee_id` INT NOT NULL AUTO_INCREMENT,
  `record_company_employee_record_company_id` INT NOT NULL,
  `role` INT NOT NULL,
  PRIMARY KEY (`record_company_employee_id`),
  INDEX `record_company_id_idx` (`record_company_employee_record_company_id` ASC) VISIBLE,
  CONSTRAINT `recored_company_employee_record_company_id_constraint`
    FOREIGN KEY (`record_company_employee_record_company_id`)
    REFERENCES `Online_Music_Library`.`record_company` (`record_company_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Online_Music_Library`.`record_company_manages`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Online_Music_Library`.`record_company_manages` (
  `record_company_manages_ record_company_id` INT NOT NULL,
  `record_company_manages_record_company_employee_id` INT NOT NULL,
  `record_company_manages_artist_id` INT NOT NULL,
  INDEX `record_company_id_idx` (`record_company_manages_ record_company_id` ASC) VISIBLE,
  INDEX `record_company_employee_id_idx` (`record_company_manages_record_company_employee_id` ASC) VISIBLE,
  INDEX `artist_id_idx` (`record_company_manages_artist_id` ASC) VISIBLE,
  PRIMARY KEY (`record_company_manages_ record_company_id`, `record_company_manages_record_company_employee_id`, `record_company_manages_artist_id`),
  CONSTRAINT `record_company_manages_record_company_id_constraint`
    FOREIGN KEY (`record_company_manages_ record_company_id`)
    REFERENCES `Online_Music_Library`.`record_company` (`record_company_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `record_company_manages_record_company_employee_id_constraint`
    FOREIGN KEY (`record_company_manages_record_company_employee_id`)
    REFERENCES `Online_Music_Library`.`record_company_employee` (`record_company_employee_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `record_company_artist_id_constraint`
    FOREIGN KEY (`record_company_manages_artist_id`)
    REFERENCES `Online_Music_Library`.`artist` (`artist_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Online_Music_Library`.`album_like`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Online_Music_Library`.`album_like` (
  `album_like_album_id` INT NOT NULL,
  `album_like_listner_id` INT NOT NULL,
  `album_like_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  PRIMARY KEY (`album_like_album_id`, `album_like_listner_id`),

  INDEX `listener_id_idx` (`album_like_listner_id` ASC) VISIBLE,

  CONSTRAINT `album_like_album_id_constraint`
    FOREIGN KEY (`album_like_album_id`)
    REFERENCES `Online_Music_Library`.`album` (`album_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `album_like_listener_id_constraint`
    FOREIGN KEY (`album_like_listner_id`)
    REFERENCES `Online_Music_Library`.`listener` (`listener_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Online_Music_Library`.`artist_like`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Online_Music_Library`.`artist_like` (
  `artist_like_artist_id` INT NOT NULL,
  `artist_like_listener_id` INT NOT NULL,
  `artist_like_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (`artist_like_artist_id`, `artist_like_listener_id`),
  
  CONSTRAINT `altist_like_artist_id_constraint`
    FOREIGN KEY (`artist_like_artist_id`)
    REFERENCES `Online_Music_Library`.`artist` (`artist_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `artist_like_listener_id_constraint`
    FOREIGN KEY (`artist_like_listener_id`)
    REFERENCES `Online_Music_Library`.`listener` (`listener_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;



SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
