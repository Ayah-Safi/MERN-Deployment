import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import PatientCountContext from '../PatientCountContext';
import  { useContext } from 'react';

const PatientList = () => {
    const [patients, setPatients] = useState([]);
    const { patientCount, fetchPatientCount } = useContext(PatientCountContext);

    useEffect(() => {
        axios.get('http://localhost:8000/patients')
            .then(response => setPatients(response.data))
            .catch(error => console.error(error));
    }, []);

    const linkStyle = {
        margin: '0 10px',
        textDecoration: 'none',
        padding: '10px 15px',
        backgroundColor: 'blue',
        color: 'white',
        borderRadius: '5px'
    };

    return (
        <div>
            <h1>Hospital Manager - {patients.length} Patients</h1> 
            <div style={{ marginBottom: '20px' }}>
                <Link to="/patients" style={linkStyle}>Home</Link>
                <Link to="/" style={linkStyle}>Admit</Link>
            </div>
            <div>
                {patients.map((patient) => (
                    <div key={patient._id} style={{ border: '1px solid black', margin: '10px', padding: '5px' }}>
                        <Link to={`/${patient._id}/details`}>
                            <h3>{patient.patientName}</h3>
                        </Link>
                        <Link to={`/${patient._id}/edit`}><button>Edit</button></Link>
                        <p>Age: {patient.age}</p>
                        <p>Symptoms: {patient.symptoms}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PatientList;
