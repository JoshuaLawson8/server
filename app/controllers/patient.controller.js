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
