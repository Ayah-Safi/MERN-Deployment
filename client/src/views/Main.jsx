import {
    Routes,
    Route,
    Link
  } from "react-router-dom";

import axios from 'axios';
import React from 'react';
import PatientAdmissionForm from "../components/PatientAdmissionForm";

const Main = () => {
  return (
    <>
        <PatientAdmissionForm/>
    </>
  );
};

export default Main;