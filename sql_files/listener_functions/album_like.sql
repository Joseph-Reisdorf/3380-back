-- -----------------------------------------------------
-- Table Online_Music_Library.like
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS Online_Music_Library.album_like (
  like_id INT NOT NULL AUTO_INCREMENT,
  listener_id INT NOT NULL,
  album_id INT NOT NULL,
  like_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (like_id),

  FOREIGN KEY (listener_id) REFERENCES listener(listener_id),
  FOREIGN KEY (album_id) REFERENCES album(album_id))
ENGINE = InnoDB;




