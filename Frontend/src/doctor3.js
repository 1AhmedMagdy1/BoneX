import React from 'react'
import personalImg from "./images/personal.webp";
import graduateImg from "./images/graduate.webp";
import professionalImg from "./images/professional.png";
import "./doctor3.css"; // Optional: your CSS file
const Doctor3 = () => {
  return (
    <div className="main-container3">
      <h1 className="head">Professional Details</h1>
      <div className="div-line"></div>

      
      
       {/*<!--Progress Bar-->*/ } 

       <div className="progress-bar3">
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

     
      <div className="info-box3">
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

      <div className="award">
        <h2>Awards/Recognitions Profile</h2>
        <button>+ Add</button>
        <span
          >Note:If you have trouble in uploading your certificates, please email them to us at Bonex@Bonex.com.</span
        >
      </div>
   
   <div className="div-line" style={{ width: '50%', marginTop: '10px' }}></div>

   





   <div className="container3">

    <form action="">

    <div className="form-row">
        <label for="i" >Current Workplace/ClinicName</label>
        <input type="text" id="i" placeholder="enter your ClinicName or address" />
   
    </div>
    <div className="form-row">
        <label for="c" >Years of experience</label>
        <input type="number" id="c" placeholder='5 Years'/>
    </div>
    <div className="form-row">
        <label for="a">consultion Fees </label>
        <input type="number" id="a"  placeholder="50 $" />
    </div>
    <div className="form-row">
        <label for="d" >consultion hours/availabilty </label>
<select name="" id="d" >
    <option value="sunday:12:00pm">sunday:12:00pm</option>
    <option value="monday:3:00pm">monday:3:00pm</option>
    <option value="friday:9:00pm">friday:9:00pm </option>

</select> 
</div>
<button type="submit">Sumbit&Continue </button>
</form>
</div>

    </div>
  );
};

export default Doctor3;