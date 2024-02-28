import './App.css'
import {
  Routes,
  Route,
  Link
} from "react-router-dom";
import Main from './views/Main';
import PatientList from './components/PatientList';
import PatientDetails from './components/PatientDetails';
import UpdatePatient from './components/UpdatePatient';
import PatientCountProvider from './PatientCountProvider';



function App() {

  return (
    <>
      <PatientCountProvider>
      <Routes>
        <Route path="/" element={<Main />}/>
        <Route path="/patients" element={<PatientList />}/>
        <Route path="/:id/details" element={<PatientDetails />}/>
        <Route path="/:id/edit" element={<UpdatePatient />}/>       
      </Routes>
      </PatientCountProvider>
    </>
  )
}

export default App
