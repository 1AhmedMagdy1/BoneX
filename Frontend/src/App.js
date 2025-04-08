import React, { useEffect, useState,useContext } from 'react';
import '../src/App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
// index.js or App.js
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Nav from './Navigationbar/Nav';

import RegisterDoctor1 from "./RegisterDoctor1";

import EditProfile from './update-profile';
import Changepassword from './changepassword';

import AcademicDetails from './doctor2';
import Doctor3 from './doctor3';
import Register from './Register';
import HomepageD from './main';
import Footer from './footer.jsx'
import UploadComponent from './XrayCheck.jsx'
import Home from './Home.js'
import Doctors from './Doctors.js'
import Chatpage from './Chatpage.js' 
import DoctorProfile from './doctorProfile.js';
import AwardModal from './AwardModal.js';
import JitsiMeet from './JitsiMeet.js';
import PatientProfile from './PatientProfile.jsx';
import PatientFeedback from './PatientFeedback.js';
import DoctorDetails from './doctorDetails.jsx'
import Pagenotfound from './pagenotfound.js';
import Notifications from './Notifications.jsx';

import Doctorsv1 from './Doctorsv1.js';
import Homev1 from './Homev1.js';
import IdentityVerification from './IdentityVerification.jsx';

function App() {


const[isAuthenticated,setisAuthenticated]=useState(false)
useEffect(()=>{

if(sessionStorage.getItem('userInfo')){
 
  setisAuthenticated(true);
}
})

  return (
    
    
    <Router>
    <Nav />
      <Routes>
        <Route path="/" element={<Homev1 />} />
        <Route path="/" element={<Home />} />

        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctorsv1" element={<Doctorsv1 />} />

        <Route path="/register" element={<Register />} />
        <Route path="/Doctor1" element={<RegisterDoctor1 />} />
        <Route path="/Doctor3" element={<Doctor3 />} />
        <Route path="/Doctor2" element={<AcademicDetails />} />
        <Route path="/iv" element={<IdentityVerification />} />
        
        
    



 

        <Route path="/profile" element={<PatientProfile />} />
        <Route path="/patientfeedback" element={<PatientFeedback/>}/>
        <Route path="/doctorDetails/:id" element={<DoctorDetails/>}/>
       
        <Route path="/xray" element={<UploadComponent />} />
        <Route path="/chat" element={<Chatpage />} />
        <Route path="/meet" element={<JitsiMeet />} />
        <Route path="/notifications" element={<Notifications/>}/>
        <Route path="/changepassword" element={<Changepassword />} />
        <Route path="/editprofile" element={<EditProfile />} />
     


      
     

<Route path="/homed" element={<HomepageD />} />
<Route path="/doctorprofile" element={<DoctorProfile />} />
<Route path="/wrd" element={<AwardModal />} />


      
        <Route path="/login" element={<Login />} />
       
        
       
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
      <Footer />
    </Router>
    
  );
}

export default App;
