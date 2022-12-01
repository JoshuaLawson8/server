const sql = require("./db.js")

// constructor
const Patient = function(patient) {
    this.id = patient.id;
    this.fName = patient.fName;
    this.lName = patient.lName;
    this.sex = patient.sex;
    this.height = patient.height;
    this.weight = patient.weight;
  };

Patient.getAll = (title, result) => {
  let query = "SELECT * FROM patient";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("patients: ", res);
    result(null, res);
  });
};

Patient.findByID = (id, result) => {
  console.log(id);
  sql.query(`SELECT * FROM patient WHERE patient_ID=${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found tutorial: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
})
}


module.exports = Patient