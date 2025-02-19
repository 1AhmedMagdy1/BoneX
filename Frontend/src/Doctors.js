import React from 'react';
import "./Home.css"
import DoctorCard from './components/DoctorCard.jsx'
import TheImage from "../src/images/avatar-male.jpg";


function Doctors() {

  // we should here retrieve the data of doctors from the database and then show them organized
  // in every panal 

  // Every card should lead to another page that called doctor details page
  
  const doctor = {
    name: 'Dr. Ahmed Imam',
    specialization: 'Cardiologist',
    description: 'Dr. John Doe is a renowned cardiologist with over 20 years of experience in treating heart diseases.',
    image: TheImage, 
  };
  const doctor2 = {
    name: 'Dr. Mohamed Esmaeal',
    specialization: 'Cardiologist',
    description: 'Dr. John Doe is a renowned cardiologist with over 20 years of experience in treating heart diseases.',
    image: TheImage, 
  };
  const doctor3 = {
    name: 'Dr. Khaled Tawfic',
    specialization: 'Cardiologist',
    description: 'Dr. John Doe is a renowned cardiologist with over 20 years of experience in treating heart diseases.',
    image: TheImage, 
  };
  const doctor4 = {
    name: 'Dr. Ibraheem Mohamed',
    specialization: 'Cardiologist',
    description: 'Dr. John Doe is a renowned cardiologist with over 20 years of experience in treating heart diseases.',
    image: TheImage, 
  };

  return (
  <div className="Doctors">
      <div className="transparent-square">
        <h1>Doctors list</h1>
        <h2>Book your appointment now!</h2>
        <DoctorCard doctor={doctor}/>
        <DoctorCard doctor={doctor2}/>
        <DoctorCard doctor={doctor3}/>
        <DoctorCard doctor={doctor4}/>
      </div>
    </div>
  );

}

export default Doctors;
