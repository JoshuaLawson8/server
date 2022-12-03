const Patient = require('../models/patient.model.js')

exports.findAll = (req, res) => {
    const title = req.query.title;
    console.log(title);
  
    Patient.getAll(title, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      else res.send(data);
    });
  };

exports.findOne = (req, res) => {
    const id = req.params.id;

    Patient.findByID(id, (err, data) => {
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

  Patient.updateById(
    req.params.id,
    new Patient(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Patient with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Patient with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.findDoctor = (req, res) => {
  const id = req.params.id;

  Patient.getDoctor(id, (err, data) => {
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

  Patient.getAppointments(id, (err, data) => {
      if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
      else res.send(data);
  })
}

exports.findPerscriptions = (req, res) => {
  const id = req.params.id;

  Patient.getPerscriptions(id, (err, data) => {
    if (err)
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving tutorials."
    });
    else res.send(data);
})
}