module.exports = app => {
    const patient = require('../controllers/patient.controller.js')
    const employee = require('../controllers/employee.controller.js')
    const location = require('../controllers/location.controller.js')
  
    var router = require("express").Router();
  
    router.get("/patient/", patient.findAll);
    router.get("/patient/:id", patient.findOne);

    router.get("/employee/", employee.findAll)
    router.get("/employee/:id", employee.findOne)

    router.get("/location/", location.findAll)
    router.get("/location/:id", location.findOne)
  
    app.use('/api/', router);
  };