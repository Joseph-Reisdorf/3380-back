-- -----------------------------------------------------
-- Table Online_Music_Library.album_like
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Online_Music_Library.album_like (
  album_like_album_id INT NOT NULL,
  album_like_listner_id INT NOT NULL,
  album_like_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (album_like_album_id, album_like_listner_id),

  CONSTRAINT album_like_album_id_constraint
    FOREIGN KEY (album_like_album_id)
    REFERENCES Online_Music_Library.album (album_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT album_like_listener_id_constraint
    FOREIGN KEY (album_like_listner_id)
    REFERENCES Online_Music_Library.listener (listener_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;