import React, { useEffect } from "react";
import personalImg from "./images/personal.webp";
import graduateImg from "./images/graduate.webp";
import professionalImg from "./images/professional.png";
import "./RegisterDoctor1.css";

const RegisterDoctor1 = () => {
  useEffect(() => {
    // Define the async function inside useEffect
    const fetchCountryCodes = async () => {
      const select = document.getElementById("country-codes");
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const countries = await response.json();
        // Clear any existing options
        select.innerHTML = "";

        let defaultSet = false; // Tracks if Egypt is set as default

        countries.forEach((country) => {
          if (country.idd?.root) {
            const suffix = country.idd.suffixes?.[0] || "";
            const code = country.idd.root + suffix;
            const option = document.createElement("option");
            option.value = code;
            option.textContent = `${country.cca2} (+${code})`;

            // Set Egypt as the default option
            if (country.cca2 === "EG") {
              option.selected = true;
              defaultSet = true;
            }

            select.appendChild(option);
          }
        });

        // If Egypt wasn't found, select the first option (if available)
        if (!defaultSet && select.options.length > 0) {
          select.options[0].selected = true;
        }
      } catch (error) {
        console.error("Error:", error);
        select.innerHTML = "<option>Error loading data</option>";
      }
    };

    // Call the async function
    fetchCountryCodes();
  }, []);

  return (
    <div className="main-container1">
      <h1 className="head">Personal Details</h1>
      <div className="div-line"></div>

      <div className="progress-bar1">
        <div className="circle">
          <img src={personalImg} alt="Personal Info" />
        </div>
        <div className="line"></div>
        <div className="circle inactive">
          <img src={graduateImg} alt="Graduation" />
        </div>
        <div className="line"></div>
        <div className="circle inactive">
          <img src={professionalImg} alt="Professional" />
        </div>
      </div>

      <div className="info-box1">
        <h2>Why Bonex?</h2>
        <hr />
        <ul>
          <li>
            • Consult over 10 million existing <span>online patients</span>{" "}
            and acquire new online patients every day.
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

      <div className="container1">
        <form action="">
          <div className="form-row">
            <label htmlFor="name">
              <i className="fas fa-user"></i> Name
            </label>
            <input type="text" id="name" placeholder="Dr Ahmed" />
          </div>

          <div className="form-row">
            <label htmlFor="dob">
              <i className="fa-regular fa-calendar"></i> Date of Birth
            </label>
            
            <input type="date" id="dob" />
          </div>

          <div className="form-row">
            <label>Gender</label>
            <div className="gender">
              <input type="radio" id="female" name="gender" />
              <label htmlFor="female">Female</label>
              <input type="radio" id="male" name="gender" />
              <label htmlFor="male">Male</label>
            </div>
          </div>

          <div className="form-row">
            <label htmlFor="mobile">
              {" "}
              <i className="fa-solid fa-phone"></i> Mobile Number
            </label>
            <div className="mobile-input">
              <select id="country-codes">
                <option>Loading...</option>
              </select>
              <input type="text" id="mobile" placeholder="01155778899" />
            </div>
          </div>

          <div className="form-row">
            <label htmlFor="email">
              <i className="fa-solid fa-envelope"></i> Email
            </label>
            <input type="email" id="email" placeholder="user@gmail.com" />
          </div>

          <div className="form-row">
            <label htmlFor="password">
              <i className="fa-solid fa-lock"></i> Password
            </label>
            <div className="input-with-icon">
              <input type="password" id="password" placeholder="12345678" />
              <i className="fa-solid fa-lock icon"></i>
            </div>
          </div>

          <div className="form-row">
            <label htmlFor="confirm-password">
              {" "}
              <i className="fa-solid fa-lock"></i> Confirm Password
            </label>
            <div className="input-with-icon">
              <input
                type="password"
                id="confirm-password"
                placeholder="12345678"
              />
              <i className="fa-solid fa-lock icon"></i>
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Submit & Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterDoctor1;
