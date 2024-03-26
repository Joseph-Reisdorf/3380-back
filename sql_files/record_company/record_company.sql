-- -----------------------------------------------------
-- Table `Online_Music_Library`.`record_company`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Online_Music_Library.record_company (
  record_company_id INT NOT NULL AUTO_INCREMENT,
  record_company_name VARCHAR(45) NOT NULL,
  record_company_address VARCHAR(45) NOT NULL,


  PRIMARY KEY (record_company_id))
ENGINE = InnoDB;