const Location = require('../models/location.model.js')

exports.findAll = (req, res) => {
    const title = req.query.title;
    console.log(title);
  
    Location.getAll(title, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving locations."
        });
      else res.send(data);
    });
  };

exports.findOne = (req, res) => {
  console.log("finding one")
    const id = req.params.id;

    Location.findByID(id, (err, data) => {
        if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
        else res.send(data);
    })
}

