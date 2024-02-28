import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from "react-router-dom";
import  { useContext } from 'react';
import {PatientCountContext} from '../PatientCountProvider';


const PatientDetails = () => {
    const [patient, setPatient] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const { patientCount } = useContext(PatientCountContext);  
    useEffect(() => {
        axios.get(`http://localhost:8000/patients/${id}`)
            .then(res => setPatient(res.data))
            .catch(err => console.log(err));
    }, [id]);

    const onDischarge = () => {
        axios.delete(`http://localhost:8000/patients/${id}`)
            .then(() => navigate('/patients'))
            .catch(err => console.log(err));
    };

    const renderAgeIcon = (age) => {
        const iconStyle = {
            display: 'block', 
            maxWidth: '50px', 
            maxHeight: '50px',
            margin: '10px auto' 
        };

        if (age < 3) {
            return <img src={`/baby.jpeg`} alt="Baby" style={iconStyle} />;
        } else if (age > 75) {
            return <img src={`/old.webp`} alt="Elderly" style={iconStyle} />;
        }
        return null;
    };

    if (!patient) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Number of Patients: {patientCount}</h1>
            <h1>{patient.patientName} Details</h1>
            <Link to="/patients"><button>Home</button></Link>
            <Link to={`/${patient._id}/edit`}><button>Update</button></Link>
            <div>
                <p>{patient.age} years of age. {renderAgeIcon(patient.age)}</p>
                <p>Symptoms</p>
                <p>{patient.symptoms}</p>
            </div>
            <button onClick={onDischarge}>Discharge Patient</button>
        </div>
    );
};

export default PatientDetails;
