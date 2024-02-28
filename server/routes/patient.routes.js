const PatientController = require('../controllers/patient.controller');

module.exports = function(app){
    app.post('/patient/add', PatientController.createPatient);
    app.get('/patients/count', PatientController.getPatientCount);
    app.get('/patients', PatientController.getAllPatients);
    app.get('/patients/:id', PatientController.getPatientById);
    app.delete('/patients/:id', PatientController.deletePatient);
    app.put('/patients/:id', PatientController.updatePatient);
    

}