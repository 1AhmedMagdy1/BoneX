import React from "react";
import personalImg from "./images/personal.webp";
import graduateImg from "./images/graduate.webp";
import professionalImg from "./images/professional.png";
import "./RegisterDoctor1.css";
const RegisterDoctor1 = () => {
  return (
    
    <div className="main-container1">
    <h1 className="head">Personal Details</h1>
    <div className="div-line"></div>

   
   
    <div className="progress-bar">
        <div className="circle">
            <img src={personalImg} alt="Personal Info" />
        </div>
        <div className="line"></div>
        <div className="circle inactive">
            <img src={graduateImg} alt="Graduation"/>
        </div>
        <div className="line"></div>
        <div className="circle inactive">
            <img src= {professionalImg} alt="Professional"/>
        </div>            
    </div>


<div className="info-box">
    <h2>Why Bonex?</h2>
    <hr />
    <ul>
        <li>• Consult over 10 million existing <span >online patients</span> and acquire new online patients every day.</li>
        <li>• Consult <span  >your patient online</span> via multiple channels -- Query, Video, and on Phone.</li>
        <li>• Discuss <span  >medical cases</span> with fellow Bonex doctors.</li>
        <li>• Increase your <span  >online brand</span> by publishing articles and health tips to a large database of our patients.</li>
    </ul>
</div>

<div className="container1">
<form action="">
    <div className="form-row">
        <label for="name"><i className="fas fa-user"></i> Name</label>
        <input type="text" id="name" placeholder="Dr Ahmed"/>
    </div>

    <div className="form-row">
        <label for="dob"><i className="fa-regular fa-calendar"></i> Date of Birth</label>
        <div className="date-picker">
            <input type="text" className="date-input" placeholder="Select date" readonly />
            <span className="calendar-icon">
              <i className="fa fa-calendar-alt"></i>
            </span>
        
            <div className="calendar">
              <div className="calendar-header">
                <span className="prev-month"><i className="fa fa-chevron-left"></i></span>
        
                
                <div className="header-center">
                  <select className="month-select"></select>
                  <select className="year-select"></select>
                </div>
        
                <span className="next-month"><i className="fa fa-chevron-right"></i></span>
              </div>
              <div className="calendar-body">
                <div className="day-names">
                  <span>Sun</span>
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                </div>
                <div className="calendar-days"></div>
              </div>
            </div>
          </div>
    </div>

    <div className="form-row">
        <label>Gender</label>
        <div className="gender">
            <input type="radio" id="female" name="gender"/>
            <label for="female">Female</label>
            <input type="radio" id="male" name="gender" />
            <label for="male">Male</label>
        </div>
    </div>

    <div className="form-row">
        <label for="mobile"> <i className="fa-solid fa-phone"></i> Mobile Number</label>
        <div className="mobile-input">
            <select id="country-codes">
                <option>Loading...</option>
            </select>
            <input type="text" id="mobile" placeholder="01155778899"/>
        </div>
    </div>

    <div className="form-row">
        <label for="email"><i className="fa-solid fa-envelope"></i> Email</label>
        <input type="email" id="email" placeholder="user@gmail.com"/>
    </div>

    <div className="form-row">
        <label for="password"><i className="fa-solid fa-lock"></i> Password</label>
        <div className="input-with-icon">
            <input type="password" id="password" placeholder="12345678"/>
            <i className="fa-solid fa-lock icon "></i>       
        </div>
    </div>

    <div className="form-row">
        <label for="confirm-password"> <i className="fa-solid fa-lock"></i> Confirm Password</label>
        <div className="input-with-icon">
            <input type="password" id="confirm-password" placeholder="12345678"/>
            <i className="fa-solid fa-lock icon "></i>       
        </div>
    </div>

    <button type="submit" className="submit-btn">Sumbit&Continue </button>
</form>
</div>





</div>

    
  );
};

export default RegisterDoctor1;
