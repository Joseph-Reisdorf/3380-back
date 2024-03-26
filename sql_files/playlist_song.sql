-- -----------------------------------------------------
-- Table Online_Music_Library.playlist_song
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Online_Music_Library.playlist_song (
  playlist_song_playlist_id INT NOT NULL,
  playlist_song_track_id INT NOT NULL,

  PRIMARY KEY (playlist_song_playlist_id, playlist_song_track_id),

  CONSTRAINT playlist_song_playlist_id_constraint
    FOREIGN KEY (playlist_song_playlist_id)
    REFERENCES Online_Music_Library.playlist (playlist_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

  CONSTRAINT playlist_song_track_id_constraint
    FOREIGN KEY (playlist_song_track_id)
    REFERENCES Online_Music_Library.track (track_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;