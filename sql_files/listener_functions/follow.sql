-- -----------------------------------------------------
-- Table Online_Music_Library.follows
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS Online_Music_Library.follows (
  follow_id INT NOT NULL AUTO_INCREMENT,
  listener_id INT NOT NULL,
  artist_id INT NOT NULL,
  follow_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (follow_id),

  FOREIGN KEY (listener_id) REFERENCES listener(listener_id),
  FOREIGN KEY (artist_id) REFERENCES artist(artist_id))
ENGINE = InnoDB;


