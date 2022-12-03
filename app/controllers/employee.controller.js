const Employee = require('../models/employee.model.js')

exports.findAll = (req, res) => {
    const title = req.query.title;
    console.log(title);
  
    Employee.getAll(title, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving employees."
        });
      else res.send(data);
    });
  };

exports.findOne = (req, res) => {
    const id = req.params.id;

    Employee.findByID(id, (err, data) => {
        if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
        else res.send(data);
    })
  }

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log("body:")
  console.log(req.body);

  Employee.updateById(
    req.params.id,
    new Employee(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Employee with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Employee with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.findPatients = (req, res) => {
  const id = req.params.id;

  Employee.getPatients(id, (err, data) => {
      if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
      else res.send(data);
  })
}

exports.findAppointments = (req, res) => {
  const id = req.params.id;

  Employee.getAppointments(id, (err, data) => {
      if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
      else res.send(data);
  })
}

