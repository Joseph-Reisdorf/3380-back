-- -----------------------------------------------------
-- Table `Online_Music_Library`.`listen_to`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Online_Music_Library.listen_to (
  listen_to_id INT NOT NULL AUTO_INCREMENT,
  listen_to_listener_id INT NOT NULL,
  listen_to_album_id INT NOT NULL,
  listen_to_datetime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  PRIMARY KEY (listen_to_id),

  CONSTRAINT listen_to_album_id_constraint
    FOREIGN KEY (listen_to_album_id)
    REFERENCES Online_Music_Library.album (album_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT listen_to_listener_id_constraint
    FOREIGN KEY (listen_to_listener_id)
    REFERENCES Online_Music_Library.listener (listener_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;
