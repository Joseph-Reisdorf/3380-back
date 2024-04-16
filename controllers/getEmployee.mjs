import db from "../database.mjs";


export const getEmployees = (req, res) => {
  const q = `SELECT employee_id, employee_firstname, employee_lastname, employee_role, employee_salary, employee_hire_date, employee_manager_id, department_name
  FROM employee, department
  WHERE employee.employee_department = department.department_id`;

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });

};

export const getAdmins = (req, res) => {
  const q = `SELECT employee_id, employee_firstname, employee_lastname
             FROM employee
             WHERE employee_id = employee_manager_id`;

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });

}