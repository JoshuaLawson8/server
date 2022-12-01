const sql = require("./db.js")

// constructor
const Employee = function(employee) {
    this.id = employee.id;
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

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
})
}


module.exports = Employee