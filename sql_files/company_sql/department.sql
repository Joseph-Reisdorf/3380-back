-- -----------------------------------------------------
-- Table Online_Music_Library.department
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Online_Music_Library.department (
  department_name VARCHAR(45) NOT NULL,
  department_id INT NOT NULL AUTO_INCREMENT,
  department_employee_manager_id INT NOT NULL,

  PRIMARY KEY (department_id, department_employee_manager_id)
  
  CONSTRAINT department_employee_manager_id_constraint
    FOREIGN KEY (department_employee_manager_id)
    REFERENCES Online_Music_Library.employee (employee_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE)

ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS Online_Music_Library.department (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(45) NOT NULL,
  department_employee_manager_id INT NOT NULL,
  PRIMARY KEY (department_id)
) ENGINE = InnoDB;

ALTER TABLE Online_Music_Library.department
ADD CONSTRAINT department_employee_manager_id_constraint
  FOREIGN KEY (department_employee_manager_id)
  REFERENCES Online_Music_Library.employee (employee_id)
  ON DELETE CASCADE
  ON UPDATE CASCADE;
