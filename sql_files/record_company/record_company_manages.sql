-- -----------------------------------------------------
-- Table Online_Music_Library.record_company_manages
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Online_Music_Library.record_company_manages (
  record_company_manages_record_company_id INT NOT NULL,
  record_company_manages_artist_id INT NOT NULL,
  
  PRIMARY KEY (record_company_manages_record_company_id, record_company_manages_artist_id),
  
  CONSTRAINT record_company_manages_record_company_id_constraint
    FOREIGN KEY (record_company_manages_record_company_id)
    REFERENCES Online_Music_Library.record_company (record_company_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

  CONSTRAINT record_company_artist_id_constraint
    FOREIGN KEY (record_company_manages_artist_id)
    REFERENCES Online_Music_Library.artist (artist_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;