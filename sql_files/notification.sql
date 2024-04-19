-- -----------------------------------------------------
-- Table Online_Music_Library.notification
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS Online_Music_Library.notification (
  notification_id INT AUTO_INCREMENT PRIMARY KEY,
  artist_id INT NOT NULL,
  listener_id INT NOT NULL,
  message VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  is_sent BOOLEAN NOT NULL DEFAULT FALSE,
  CONSTRAINT artist_id_fk
    FOREIGN KEY (artist_id)
    REFERENCES Online_Music_Library.artist (artist_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT listener_id_fk
    FOREIGN KEY (listener_id)
    REFERENCES Online_Music_Library.listener (listener_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)
ENGINE = InnoDB;