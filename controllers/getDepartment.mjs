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

export const addDepartment = (req, res) => {
  const { departmentName, departmentManagerId } = req.body;
  const q = "INSERT INTO department (department_name, department_employee_manager_id) VALUES (?, ?)";

  db.query(q, [departmentName, departmentManagerId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
}

export const deleteDepartment = (req, res) => {
  const { department_id } = req.body;
  const q = "DELETE FROM department WHERE department_id=?";

  db.query(q, [department_id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
}