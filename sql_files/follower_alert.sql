
CREATE TABLE IF NOT EXISTS Online_Music_Library.follower_alert (
    
    follower_alert_id INT NOT NULL AUTO_INCREMENT,
    follower_alert_artist_id INT NOT NULL,
    follower_alert_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    follower_alert_message VARCHAR(255) NOT NULL,
    follower_alert_seen BOOLEAN NOT NULL,
      

    PRIMARY KEY (follower_alert_id),

    CONSTRAINT follower_alert_artist_id_constraint
        FOREIGN KEY (album_primary_artist_id)
        REFERENCES Online_Music_Library.artist (artist_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE)
    
ENGINE = InnoDB;