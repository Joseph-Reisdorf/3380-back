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