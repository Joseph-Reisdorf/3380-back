DELIMITER $$
CREATE TRIGGER add_to_artist_table
AFTER INSERT ON person
FOR EACH ROW
BEGIN
  IF NEW.person_role = 'a' THEN
    INSERT INTO artist (artist_id, artist_display_name)
    SELECT listener_id, listener_username
    FROM listener
    WHERE listener_id = NEW.person_id;
  END IF;
END$$
DELIMITER ;
