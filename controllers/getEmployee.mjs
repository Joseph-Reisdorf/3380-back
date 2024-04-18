import db from "../database.mjs";


export const getEmployees = (req, res) => {
  const q = `SELECT
              e.employee_id,
              e.employee_firstname,
              e.employee_lastname,
              e.employee_role,
              e.employee_salary,
              e.employee_hire_date,
              e.employee_manager_id,
              d.department_name,
              CONCAT(m.employee_firstname, ' ', m.employee_lastname) AS manager_name
            FROM
              employee e
            JOIN
              department d ON e.employee_department = d.department_id
            LEFT JOIN
              employee m ON e.employee_manager_id = m.employee_id`;

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