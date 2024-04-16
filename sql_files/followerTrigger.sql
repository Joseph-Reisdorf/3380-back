


use Online_Music_Library;

DELIMITER //
CREATE TRIGGER follower_treshold_trigger
Before update on artist_like
for each row
begin
    declare follower_count int;
    declare artist_id int;
    declare artist_name varchar(255);
    declare follower_threshold int;
    set artist_id = new.artist_id;
    set artist_name = (select artist_name from artist where artist_id = artist_id);
    set follower_count = (select count(*) from artist_like where artist_id = artist_id);
    set follower_threshold = (select follower_threshold from artist where artist_id = artist_id);
    if follower_count > follower_threshold then
        insert into artist_follower_threshold_exceeded values (artist_id, artist_name, follower_count, follower_threshold);
    end if;


end;

CREATE TABLE IF NOT EXISTS Online_Music_Library.person (
  person_id 					INT 			NOT NULL 	AUTO_INCREMENT,
  person_first_name 			VARCHAR(45) 	NOT NULL,
  person_middle_initial 		VARCHAR(1) 		NULL,
  person_last_name	 			VARCHAR(45) 	NOT NULL,
  person_email	 				VARCHAR(45) 	NOT NULL	UNIQUE,
  -- Maybe implement a phone number --
  person_registration_date	 	TIMESTAMP 		NOT NULL
									DEFAULT  		CURRENT_TIMESTAMP,
  person_update_date			TIMESTAMP		NOT NULL	
									DEFAULT			CURRENT_TIMESTAMP
									ON UPDATE		CURRENT_TIMESTAMP,
  person_birthdate	 			DATE 			NOT NULL,
  person_hashed_password		VARCHAR(100) 	NOT NULL,
  person_address 				VARCHAR(45) 	NULL,
	
    PRIMARY KEY (person_id))
ENGINE = InnoDB;

DROP TABLE person;