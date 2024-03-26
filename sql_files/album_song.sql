-- -----------------------------------------------------
-- Table Online_Music_Library.album_song
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Online_Music_Library.album_song (
  album_song_album_id INT NOT NULL,
  album_song_track_id INT NOT NULL,

  PRIMARY KEY (album_song_album_id, album_song_track_id),

  CONSTRAINT album_song_album_id_constraint
    FOREIGN KEY (album_song_album_id)
    REFERENCES Online_Music_Library.album (album_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

  CONSTRAINT album_song_track_id_constraint
    FOREIGN KEY (album_song_track_id)
    REFERENCES Online_Music_Library.track (track_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;
