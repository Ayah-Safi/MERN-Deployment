import React, { useState } from 'react';
import axios from 'axios';
import {
  Routes,
  Route,
  Link 
} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PatientCountContext from '../PatientCountContext';
import  { useContext } from 'react';

  

const PatientAdmissionForm = () => {
    const [age, setAge] = useState('');
    const [patientName, setPatientName] = useState('');
    const [symptoms, setSymptoms] = useState('');
    const [errors, setErrors] = useState([]); 
    const navigate = useNavigate();
    const { patientCount, fetchPatientCount } = useContext(PatientCountContext);
    
    const onSubmitHandler = e => {
        e.preventDefault();
        axios.post('http://localhost:8000/patient/add', {
            age,
            patientName,
            symptoms
        })
        .then(res => {
            console.log(res);
            setErrors([]); 
            navigate("/patients");
        })
        .catch(err => {
            const errorResponse = err.response.data.errors; 
            const errorArr = [];
            for (const key in errorResponse) { 
                errorArr.push(errorResponse[key].message);
            }
            setErrors(errorArr);
        });
    };

    return (
      <>
        <h1>Admit Patient</h1>
        <h1>Number of Patients: {patientCount}</h1>
        <Link to={"/patients"}>Home</Link>
        <form onSubmit={onSubmitHandler}>
            {errors.map((err, index) => <p key={index} style={{ color: 'red' }}>{err}</p>)}
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
            <input type="submit" value="Admit Patient"/>
        </form>
      </>
    );
};

export default PatientAdmissionForm;
