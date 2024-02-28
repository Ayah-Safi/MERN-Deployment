import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const PatientCountContext = createContext();

export const PatientCountProvider = ({ children }) => {
    const [patientCount, setPatientCount] = useState(0);

    const fetchPatientCount = () => {
        axios.get('http://localhost:8000/patients/count')
            .then(response => {
                if (response.data && typeof response.data.count === 'number') {
                    setPatientCount(response.data.count);
                } else {
                    console.error("Response from server does not contain patient count.");
                }
            })
            .catch(error => {
                console.error("Failed to fetch patient count:", error);
            });
    };

    useEffect(() => {
        fetchPatientCount();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            fetchPatientCount();
        }, 5000);
    
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        console.log(patientCount);
    }, [patientCount]);

    return (
        <PatientCountContext.Provider value={{ patientCount, fetchPatientCount }}>
            {children}
        </PatientCountContext.Provider>
    );
};

export default PatientCountProvider;
