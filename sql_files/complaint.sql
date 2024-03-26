-- -----------------------------------------------------
-- Table `Online_Music_Library`.`complaint`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Online_Music_Library.complaint (
 complaint_id INT NOT NULL AUTO_INCREMENT,
 complaint_person_id INT NOT NULL,
 complaint_addressed BOOLEAN NOT NULL,
 complaint_employee_id INT NULL, -- is the id of whoever handles the complaint
 complaint_created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 complaint_summary TEXT NULL,
 complaint_documentation BLOB NULL,
 complaint_addressed TINYINT NOT NULL,
 complaint_when_resolved DATE NULL,


 PRIMARY KEY (complaint_id),

 CONSTRAINT complaint_person_id_constraint
   FOREIGN KEY (complaint_person_id)
   REFERENCES Online_Music_Library.person (person_id)
   ON DELETE CASCADE
  ON UPDATE CASCADE,
  
 CONSTRAINT complaint_employee_id_constraint
   FOREIGN KEY (complaint_employee_id)
   REFERENCES Online_Music_Library.employee (employee_id)
   ON DELETE CASCADE
   ON UPDATE CASCADE)
ENGINE = InnoDB;
