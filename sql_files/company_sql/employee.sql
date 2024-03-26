-- -----------------------------------------------------
-- Table Online_Music_Library.employee
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Online_Music_Library.employee (
  employee_id INT NOT NULL AUTO_INCREMENT,
  employee_firstname VARCHAR(45) NOT NULL,
  employee_lastname VARCHAR(45) NOT NULL,
  employee_department INT NOT NULL,
  employee_role VARCHAR(45) NOT NULL,
  employee_salary DECIMAL(10,2) NOT NULL,
  employee_hire_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  employee_termination_date TIMESTAMP NULL DEFAULT NULL,
  employee_manager_id INT NULL,

  PRIMARY KEY (employee_id),

  CONSTRAINT employee_department_id_constraint
    FOREIGN KEY (employee_department)
    REFERENCES Online_Music_Library.department (department_id)

    ON DELETE CASCADE
    ON UPDATE CASCADE,
  
  CONSTRAINT employee_manager_id_constraint
    FOREIGN KEY (employee_manager_id)
    REFERENCES Online_Music_Library.employee (employee_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE)

ENGINE = InnoDB;