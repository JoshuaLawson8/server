const sql = require("./db.js")

// constructor
const Patient = function(patient) {
    this.Patient_ID = patient.Patient_ID;
    this.First_Name = patient.First_Name;
    this.Last_Name = patient.Last_Name;
    this.Sex = patient.Sex;
    this.Height = patient.Height;
    this.Weight = patient.Weight;
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
  sql.query(`SELECT * FROM patient WHERE Patient_ID=${id}`, (err, res) => {
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

Patient.updateById = (Patient_ID, patient, result) => {
  sql.query(
    "UPDATE patient SET First_Name = ?, Last_Name = ?, Height = ?, Weight = ?, Sex = ? WHERE Patient_ID = ?", //add address
    [patient.First_Name, patient.Last_Name, patient.Height, patient.Weight, patient.Sex, Patient_ID],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Patient with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated patient: ", { Patient_ID: Patient_ID, ...patient });
      result(null, { Patient_ID: Patient_ID, ...patient });
    }
  );
};

Patient.getDoctor = (Patient_ID, result) => {

 try{
  sql.query(`select E.* from patient P
  JOIN patient_employee B
  on P.Patient_ID = B.Patient_ID
  JOIN employee E
  on E.Employee_ID = B.Employee_ID
  where P.Patient_ID = ?
  `,
    [Patient_ID],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.length) {
        console.log("found provider: ", res[0]);
        result(null, res[0]);
        return;
      }

      result({ kind: "not_found" }, null);
      console.log(result)
      return
    }
  );
 }catch{
  console.log("exception here")
 }
};

Patient.getAppointments = (Patient_ID, result) => {

  sql.query(
    `SELECT P.*, E.First_Name, E.Last_Name from patient_appointment P
    join employee E
    on E.Employee_ID = P.Employee_ID
    where Patient_ID = ?
    `,
    [Patient_ID],
    (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("appointments: ", res);
    result(null, res);
  });
};

Patient.getPerscriptions = (Patient_ID, result) => {

  sql.query(
    `select M.*, P.* from patient_medication P 
    join medication M
    on M.Medication_ID = P.Medication_ID
    where Patient_ID = ?`,
    [Patient_ID],
    (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("medications: ", res);
    result(null, res);
  });
};


module.exports = Patient