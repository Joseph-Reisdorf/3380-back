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







-- -----------------------------------------------------
-- Table Online_Music_Library.department
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Online_Music_Library.department (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(45) NOT NULL,
  department_employee_manager_id INT NULL,  -- Allow NULL temporarily

  PRIMARY KEY (department_id)
) ENGINE = InnoDB;

INSERT INTO Online_Music_Library.department (department_name)
VALUES ('Administration');
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
    ON UPDATE CASCADE
) ENGINE = InnoDB;

INSERT INTO Online_Music_Library.employee (employee_firstname, employee_lastname, employee_department, employee_role, employee_salary)
VALUES ('Admin', 'Administronson', LAST_INSERT_ID(), 'Administrator', 100000.00);

UPDATE Online_Music_Library.employee
SET employee_manager_id = LAST_INSERT_ID()
WHERE employee_id = LAST_INSERT_ID();

UPDATE Online_Music_Library.department
SET department_employee_manager_id = LAST_INSERT_ID()
WHERE department_id = (SELECT employee_department FROM Online_Music_Library.employee WHERE employee_id = LAST_INSERT_ID());

-- Add the constraint to department after employee table is populated
ALTER TABLE Online_Music_Library.department
ADD CONSTRAINT department_employee_manager_id_constraint
  FOREIGN KEY (department_employee_manager_id)
  REFERENCES Online_Music_Library.employee (employee_id)
  ON DELETE SET NULL
  ON UPDATE CASCADE;