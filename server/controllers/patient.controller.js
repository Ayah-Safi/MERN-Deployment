const { Patient } = require('../models/patient.model');

module.exports.createPatient = (request, response) => {
    const { age, patientName, symptoms } = request.body;
    Patient.create({
        age,
        patientName,
        symptoms
    })
        .then(patient => response.json(patient))
        .catch(err => response.status(400).json(err));
};

module.exports.getAllPatients = (request, response) => {
    Patient.find({})
        .then(patients => response.json(patients))
        .catch(err => response.status(400).json(err));
};

module.exports.getPatientById = (request, response) => {
    Patient.findById(request.params.id)
        .then(patient => response.json(patient))
        .catch(err => response.status(404).json(err));
};

module.exports.deletePatient = (request, response) => {
    Patient.findByIdAndDelete(request.params.id)
        .then(() => response.json({ message: 'Patient deleted successfully' }))
        .catch(err => response.status(400).json(err));
};

module.exports.updatePatient = (request, response) => {
    Patient.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true })
        .then(updatedPatient => response.json(updatedPatient))
        .catch(err => response.status(400).json(err));
};

module.exports.getPatientCount = async (req, res) => {
    try {
        const count = await Patient.countDocuments();
        res.json({ count });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while fetching patient count", error: error });
    }
};

module.exports.getPatientCount = async (req, res) => {
    try {
        const patientCount = await Patient.countDocuments();
        res.json({ count: patientCount });
    } catch (error) {
        res.status(500).send(error.message);
    }
};