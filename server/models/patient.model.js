const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    age: {
        type: Number,
        required: [true, "A patient's age is required!"],
        min: [1, "Patient age must be at least 1."],
        max: [140, "Patient age can be no more than 140."],
        validate: {
            validator: function (value) {
                if (value < 18) {
                    return this.parentalConsent === true;
                }
                return true; 
            },
            message: "Sorry, we need a parental signature" 
        }
    },
    patientName: {
        type: String,
        required: [true, "A patient's name is required!"],
        minlength: [1, "Patient names must be at least 1 character long."],
        maxlength: [40, "Patient names can be no more than 40 characters long."]
    },
    symptoms: {
        type: String,
        required: [true, "A patient's symptoms are required!"],
        minlength: [4, "Patient symptoms must be at least 4 characters long."]
    },
    parentalConsent: {
        type: Boolean
    }
}, { timestamps: true });

module.exports.Patient = mongoose.model('Patient', PatientSchema);
