import db from "../database.mjs";
import bcrypt from "bcrypt";

const saltRounds = parseInt(process.env.SALT_ROUNDS, 10) || 10;

const personQuery = "INSERT INTO Online_Music_Library.person (person_first_name, person_middle_initial, person_last_name, person_email, person_birthdate, person_hashed_password, person_role) VALUES (?, ?, ?, ?, ?, ?, ?)";
const employeeQuery = "INSERT INTO Online_Music_Library.employee (employee_id, employee_firstname, employee_lastname, employee_department, employee_role, employee_salary, employee_hire_date, employee_manager_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
                                 


// Helper functions to extract domain and check roles
function getDomain(email) {
    return email.split("@")[1];
}

function validateEmail(email) {
    const domain = getDomain(email);
    const validDomains = ["company.com", "central.company.com"];
    return validDomains.includes(domain);
}

function isEmployee(email) {
    const domain = getDomain(email);
    return domain === "company.com";
}

function isAdmin(email) {
    const domain = getDomain(email);
    return domain === "central.company.com";
}

function getRole(email) {
    if (isAdmin(email)) {
        return 'x'; // Admin role
    } else if (isEmployee(email)) {
        return 'e'; // Employee role
    }
    return null;
}

// Registration function for an employee
export const registerEmployee = async (req, res) => {
    const validEmail = validateEmail(req.body.email);
    const isAdmin = req.body.isAdmin; 
    /*
    const req_values = [
        req.body.firstName,
        req.body.lastName,
        req.body.middleInitial,
        req.body.email,
        req.body.pwd,
        req.body.birthdate,
        req.body.department,
        req.body.role,
        req.body.salary,
        req.body.hireDate,
        req.body.managerId
    ]; */
    
    if (!validEmail) {
        return res.status(400).send("Invalid email domain");
    }

    const person_values = [
        req.body.firstName,
        req.body.middleInitial,
        req.body.lastName,
        req.body.email,
        req.body.birthdate,
        req.body.pwd, // This will be hashed below
        getRole(req.body.email)
    ];

    db.getConnection((err, db) => {
        if (err) {
            console.error("Error getting connection");
            return res.status(500).send("Error registering person");
        }

        // hash password
        bcrypt.hash(person_values[5], saltRounds, (err, hash) => {
            if (err) {
                db.release();
                console.log("Error hashing password:");
                return res.status(500).send("Error registering person");
            }
            person_values[5] = hash; // replace password with hash
            
            db.beginTransaction((err) => {
                if (err) {
                    connection.release();
                    console.log("Error beginning transaction");
                    return res.status(500).send("Error beginning transaction");
                }
                // add as person ----------------------
                db.query(personQuery, person_values, (err, result) => {
                    if (err) {
                        return db.rollback(() => {
                            db.release();
                            console.log("Error inserting person");
                            return res.status(500).send("Error inserting person");
                        });
                    }
                    const personId = result.insertId; // get for next two transactions

                    
                    // add as employee ----------------------
                    const employeeValues = [
                        personId,
                        req.body.firstName,
                        req.body.lastName,
                        req.body.department,
                        req.body.role,
                        req.body.salary,
                        req.body.hireDate,
                        ((req.body.managerId === '' && isAdmin) ? personId : req.body.managerId)
                    ];
                    db.query(employeeQuery, employeeValues, (err, result) => {
                        if (err) {
                            return db.rollback(() => {
                                db.release();
                                console.log("Error inserting employee");
                                return res.status(500).send("Error inserting employee");
                            });
                        }
                        db.commit((err) => {
                            if (err) {
                                return db.rollback(() => {
                                    db.release();
                                    console.log("Error committing transaction");
                                    return res.status(500).send("Error committing transaction");
                                });
                            }
                            db.release();
                            return res.status(200).send("Employee registered");
                        }); // end of commit
                    }); // end of employee query
                }); // end of person query
            }); // end of beginTransaction
        });
    });
}
