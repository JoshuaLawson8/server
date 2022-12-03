const sql = require("./db.js")

// constructor
const Employee = function(employee) {
    this.Employee_ID = employee.Employee_ID;
    this.First_Name = employee.First_Name;
    this.Last_Name = employee.Last_Name;
    this.Provider_Type = employee.Provider_Type;
    this.Location_ID = employee.Location_ID;
  };

Employee.getAll = (title, result) => {
  let query = "SELECT * FROM employee";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("employees: ", res);
    result(null, res);
  });
};

Employee.findByID = (id, result) => {
  console.log(id);
  sql.query(`SELECT * FROM employee WHERE Employee_ID=${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found employee: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Employee with the id
    result({ kind: "not_found" }, null);
})
}

Employee.updateById = (id, employee, result) => {
  sql.query(
    "UPDATE employee SET Provider_Type = ?, Location_ID = ?, First_Name = ?, Last_Name = ? WHERE Employee_ID = ?",
    [employee.Provider_Type, employee.Location_ID, employee.First_Name, employee.Last_Name, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Employee with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated employee: ", { id: id, ...employee });
      result(null, { id: id, ...employee });
    }
  );
};

Employee.getPatients = (id, result) => {
  sql.query(
    `select P.* from employee E
    JOIN patient_employee B
    on E.Employee_ID = B.Employee_ID
    JOIN patient P
    on P.Patient_ID = B.Patient_ID
    where E.Employee_ID = ?`,
    [id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("patients: ", res);
      result(null, res);
    }
  )
}

Employee.getAppointments = (id, result) => {
  sql.query(
    `select P.*, B.* from employee E
    JOIN patient_appointment B
    on E.Employee_ID = B.Employee_ID
    JOIN patient P
    on P.Patient_ID = B.Patient_ID
    where E.Employee_ID = ?`,
    [id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("patients: ", res);
      result(null, res);
    }
  )
}


module.exports = Employee