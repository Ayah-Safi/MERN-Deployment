import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import  { useContext } from 'react';
import {PatientCountContext} from '../PatientCountProvider';


const UpdatePatient = () => {
    const [age, setAge] = useState('');
    const [patientName, setPatientName] = useState('');
    const [symptoms, setSymptoms] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();
    const { patientCount } = useContext(PatientCountContext);  
    useEffect(() => {
        axios.get(`http://localhost:8000/patients/${id}`)
            .then(response => {
                const { age, patientName, symptoms } = response.data;
                setAge(age);
                setPatientName(patientName);
                setSymptoms(symptoms);
            })
            .catch(error => console.error(error));
    }, [id]);

    const validateForm = () => {
        return age && patientName && symptoms;
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (validateForm()) {
            axios.put(`http://localhost:8000/patients/${id}`, {
                age,
                patientName,
                symptoms
            })
            .then(() => navigate(`/${id}/details`))
            .catch(err => console.error(err));
        } else {
           
        }
    };

    return (
        <div>
            <h1>Update Patient</h1>
            <h1>Number of Patients: {patientCount}</h1>
            <div style={{ marginBottom: '20px' }}>
                <Link to="/patients" style={{ marginRight: '10px' }}>Home</Link>
                <Link to={`/${id}/details`}>Details</Link>
            </div>
            <form onSubmit={onSubmitHandler}>
                <p>
                    <label>Age</label><br/>
                    <input 
                        type="number" 
                        onChange={(e) => setAge(e.target.value)} 
                        value={age}
                    />
                </p>
                <p>
                    <label>Patient Name</label><br/>
                    <input 
                        type="text" 
                        onChange={(e) => setPatientName(e.target.value)} 
                        value={patientName}
                    />
                </p>
                <p>
                    <label>Symptoms</label><br/>
                    <textarea 
                        onChange={(e) => setSymptoms(e.target.value)} 
                        value={symptoms}
                    />
                </p>
                <input type="submit" value="Update Patient"/>
            </form>
        </div>
    );
};

export default UpdatePatient;
