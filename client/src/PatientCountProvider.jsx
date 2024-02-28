import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const PatientCountContext = createContext();

export const PatientCountProvider = ({ children }) => {
    const [patientCount, setPatientCount] = useState(0);

    const fetchPatientCount = async () => {
        try {
            const response = await axios.get('http://localhost:8000/patients/count');
            setPatientCount(response.data.length);
        } catch (error) {
            console.error("Failed to fetch patient count:", error);
        }
    };

    useEffect(() => {
        fetchPatientCount();
    }, []);

    return (
        <PatientCountContext.Provider value={{ patientCount, fetchPatientCount }}>
            {children}
        </PatientCountContext.Provider>
    );
};

export default PatientCountProvider;
