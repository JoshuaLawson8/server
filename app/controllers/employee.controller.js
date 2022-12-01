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
