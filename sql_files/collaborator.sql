-- -----------------------------------------------------
-- Table Online_Music_Library.collaborator
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Online_Music_Library.collaborator (
  collaborator_track_id INT NOT NULL,
  collaborator_artist_id INT NOT NULL,
  collaborator_role VARCHAR(45) NULL,

  PRIMARY KEY (collaborator_track_id, collaborator_artist_id),

  CONSTRAINT collaborator_track_id_constraint
    FOREIGN KEY (collaborator_track_id)
    REFERENCES Online_Music_Library.track (track_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,

  CONSTRAINT collaborator_artist_id_constraint
    FOREIGN KEY (collaborator_artist_id)
    REFERENCES Online_Music_Library.artist (artist_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;