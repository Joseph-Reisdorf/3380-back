CREATE TABLE IF NOT EXISTS Online_Music_Library.track_like (
  track_like_listener_id INT NOT NULL,
  track_like_track_id INT NOT NULL,
  track_like_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  PRIMARY KEY (track_like_listener_id, track_like_track_id),

  CONSTRAINT track_like_track_id_constraint
    FOREIGN KEY (track_like_track_id)
    REFERENCES Online_Music_Library.track (track_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT track_like_listener_id_constraint
    FOREIGN KEY (track_like_listener_id)
    REFERENCES Online_Music_Library.listener (listener_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;