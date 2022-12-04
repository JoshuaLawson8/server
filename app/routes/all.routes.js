module.exports = app => {
    const patient = require('../controllers/patient.controller.js')
    const employee = require('../controllers/employee.controller.js')
    const location = require('../controllers/location.controller.js')

    console.log(location)
    var router = require("express").Router();
  
    router.get("/patient/", patient.findAll)
    router.get("/patient/:id", patient.findOne)
    router.put("/patient/:id", patient.update)
    router.get("/findProvider/:id", patient.findDoctor)
    router.get("/findPatientAppointments/:id", patient.findAppointments)
    router.get("/findPerscriptions/:id", patient.findPerscriptions)

    router.get("/employee/", employee.findAll)
    router.get("/employee/:id", employee.findOne)
    router.put("/employee/:id", employee.update)
    router.get("/findPatients/:id", employee.findPatients)
    router.get("/findDoctorAppointments/:id",employee.findAppointments)
    
    router.get("/location/", location.findAll)
    router.get("/location/:id", location.findOne)
    //router.put("/location/:id", location.update)
  
    app.use('/api/', router);
   };