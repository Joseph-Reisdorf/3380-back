-- -----------------------------------------------------
-- Table Online_Music_Library.artist_like
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS Online_Music_Library.artist_like (
  artist_like_artist_id INT NOT NULL,
  artist_like_listener_id INT NOT NULL,
  artist_like_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (artist_like_artist_id, artist_like_listener_id),

  CONSTRAINT altist_like_artist_id_constraint
    FOREIGN KEY (artist_like_artist_id)
    REFERENCES Online_Music_Library.artist (artist_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT artist_like_listener_id_constraint
    FOREIGN KEY (artist_like_listener_id)
    REFERENCES Online_Music_Library.listener (listener_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


