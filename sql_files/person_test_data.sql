

-- Test data to go into person table --

INSERT INTO Online_Music_Library.person 
(person_first_name, person_middle_initial, person_last_name, person_email, person_registration_date, person_update_date, person_birthdate, person_hashed_password, person_address) 
VALUES 
('John', 'A', 'Doe', 'john.doe@example.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '1980-01-01', 'hashed_password_1', '123 Elm St'),
('Jane', 'B', 'Smith', 'jane.smith@example.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '1985-02-02', 'hashed_password_2', '456 Oak St'),
('Emily', NULL, 'Johnson', 'emily.johnson@example.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '1990-03-03', 'hashed_password_3', '789 Pine St'),
('Michael', 'C', 'Williams', 'michael.williams@example.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '1975-04-04', 'hashed_password_4', '101 Maple St');


-- Test select statement --
select person_first_name
from person
where person_middle_initial is not null;
