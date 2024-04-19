
-- -----------------------------------------------------
-- Trigger for notification upon new song upload 
-- -----------------------------------------------------
DELIMITER $$

CREATE TRIGGER after_insert_track
AFTER INSERT ON track
FOR EACH ROW
BEGIN
    DECLARE artist_name VARCHAR(45);
    SET artist_name = (SELECT artist_display_name FROM artist WHERE artist_id = NEW.track_primary_artist_id);
    
    -- Check if the artist has listeners who want to receive notifications
    INSERT INTO notification (artist_id, listener_id, message, created_at, is_sent)
    SELECT al.artist_like_artist_id, 
           al.artist_like_listener_id,
           CONCAT(artist_name, ' has uploaded a new song! Come check it out!') AS message,
           NOW() AS created_at,
           0 AS is_sent -- Set is_sent to 0 initially (not sent)
    FROM artist_like AS al
    WHERE al.artist_like_artist_id = NEW.track_primary_artist_id;
END $$

DELIMITER ;


