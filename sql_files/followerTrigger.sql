
DELIMITER //

CREATE TRIGGER artist_like_threshold_trigger
AFTER INSERT ON artist_like
FOR EACH ROW
BEGIN
    DECLARE follower_count INT;
    DECLARE artist_id INT;

    -- Assuming artist_like_artist_id is a column in artist_like
    SET artist_id = NEW.artist_like_artist_id;

    -- Example: Assuming artist_like tracks each like with a new row per artist
    SELECT COUNT(*) INTO follower_count
    FROM artist_like
    WHERE artist_like_artist_id = artist_id;

    -- Check if the follower count is a multiple of 100
    IF follower_count = 5 THEN
        INSERT INTO follower_alert (follower_alert_artist_id, follower_alert_date_time, follower_alert_message, follower_alert_seen)
        VALUES (artist_id, NOW(), 'You have reached 5 followers.', FALSE);
    END IF;

    IF follower_count = 10 THEN
        INSERT INTO follower_alert (follower_alert_artist_id, follower_alert_date_time, follower_alert_message, follower_alert_seen)
        VALUES (artist_id, NOW(), 'You have reached 10 followers!', FALSE);
    END IF;

    IF follower_count = 15 THEN
        INSERT INTO follower_alert (follower_alert_artist_id, follower_alert_date_time, follower_alert_message, follower_alert_seen)
        VALUES (artist_id, NOW(), 'You have reached 15 followers!!! :)', FALSE);
    END IF;

    IF follower_count % 100 = 0 AND follower_count >= 100 THEN
        INSERT INTO follower_alert (follower_alert_artist_id, follower_alert_date_time, follower_alert_message, follower_alert_seen)
        VALUES (artist_id, NOW(), CONCAT('You have reached ', follower_count, ' followers'), FALSE);
    END IF;

END;

//
DELIMITER ;
