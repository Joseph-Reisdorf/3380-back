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