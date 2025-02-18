import React from "react";
import personalImg from "./images/personal.webp";
import graduateImg from "./images/graduate.webp";
import professionalImg from "./images/professional.png";
import "./doctor2.css"; // Optional: your CSS file

const AcademicDetails = () => {
  return (
   
    
    <div className="main-container2">

      <h1 className="head">Academic Details</h1>
      
      <div className="div-line"></div>
 {/*<!--Progress Bar-->*/ } 

      <div className="progress-bar">
        <div className="circle done">
          <img src={personalImg} alt="Personal Info" />
        </div>
        <div className="line"></div>
        <div className="circle">
          <img src={graduateImg} alt="Graduation" />
        </div>
        <div className="line"></div>
        <div className="circle inactive">
          <img src={professionalImg} alt="Professional" />
        </div>
      </div>
    
   {/*<!--separator-->*/ } 
   {/*<!--Info Box-->*/ } 
    
      <div className="info-box">
        <h2>Why Bonex?</h2>
        <hr />
        <ul>
          <li>
            • Consult over 10 million existing <span>online patients</span> and
            acquire new online patients every day.
          </li>
          <li>
            • Consult <span>your patient online</span> via multiple channels --
            Query, Video, and on Phone.
          </li>
          <li>
            • Discuss <span>medical cases</span> with fellow Bonex doctors.
          </li>
          <li>
            • Increase your <span>online brand</span> by publishing articles and
            health tips to a large database of our patients.
          </li>
        </ul>
      </div>

         {/*<!--Form-->*/ } 
      <div className="container2">
        <form action="">
          <div className="form-row">
            <label for="i" >Unvirsity Name</label>
            <input type="text" id="i" placeholder="Harverd" />
          </div>
          <div className="form-row">
            <label for="c"  >Graduation Year</label>
            <input type="number" id="c" />
          </div>
          <div className="form-row">
            <label for="a"  >Degree Certificate</label>
            <div className="pstd">
            <input type="file" id="a" />
            <span>Max Size is 5MB</span>
            </div>
        
        </div>
          <div className="form-row">
            <label for="postGrad"  
              >Postgraduate (if any)
              </label
            >
            <div className="pstd">
            <input type="file" id="postGrad" />
            

            <span>Max Size is 5MB</span>
             </div>

          </div>

     { /*
<div className="form-row">
  <label for="">Specialities</label>
  <div className="container">
    <div className="btn-select">
      <span className="btn-text">Select Specialities</span>
      <span className="arrow-down">
        <i className="fas fa-chevron-down"></i>
      </span>
    </div>

    <ul className="list-items">
      <li className="item">
        <span className="checkbox">
          <i className="fas fa-check check-icon"></i>
        </span>
        <span className="item-text">Orthopedics</span>
      </li>
      <li className="item">
        <span className="checkbox">
          <i className="fas fa-check check-icon"></i>
        </span>
        <span className="item-text">Radiology</span>
      </li>
      <li className="item">
        <span className="checkbox">
          <i className="fas fa-check check-icon"></i>
        </span>
        <span className="item-text">Sports Medicine</span>
      </li>
      <li className="item">
        <span className="checkbox">
          <i className="fas fa-check check-icon"></i>
        </span>
        <span className="item-text">Others</span>
      </li>

    </ul>
  </div>

        </div>
*/}
          <div className="form-row">
            <label for="i"  
              >Medical Registration Number</label
            >
            <input type="text" id="i" placeholder="Fill you Medical Registration Number"/>
          </div>

          

          <button type="submit">Sumbit&Continue </button>
        </form>
      </div>

    </div>
  );
};

export default AcademicDetails;
