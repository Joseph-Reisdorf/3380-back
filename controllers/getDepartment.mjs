import db from "../database.mjs";


export const getDepartments = (req, res) => {
  const q = `SELECT department_id, department_name, CONCAT(employee_firstname, ' ', employee_lastname) AS department_manager_name
             FROM department, employee
             WHERE department.department_employee_manager_id = employee.employee_id
            `;

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });

};