import React, { useEffect, useState } from "react";
import personalImg from "./images/personal.webp";
import { useNavigate } from "react-router-dom";
import graduateImg from "./images/graduate.webp";
import professionalImg from "./images/professional.png";
import "./RegisterDoctor1.css";

const RegisterDoctor1 = () => {
   const navigate = useNavigate();
  // State for fetched country codes
  const [countryCodes, setCountryCodes] = useState([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState("");

  useEffect(() => {
    const fetchCountryCodes = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const countries = await response.json();
        const codes = [];
        let defaultSelected = "";
        countries.forEach((country) => {
          if (country.idd?.root) {
            const suffix = country.idd.suffixes?.[0] || "";
            const code = country.idd.root + suffix;
            codes.push({
              cca2: country.cca2,
              code,
            });
            if (!defaultSelected && country.cca2 === "EG") {
              defaultSelected = code;
            }
          }
        });
        if (!defaultSelected && codes.length > 0) {
          defaultSelected = codes[0].code;
        }
        setCountryCodes(codes);
        setSelectedCountryCode(defaultSelected);
      } catch (error) {
        console.error("Error fetching country codes:", error);
      }
    };

    fetchCountryCodes();
  }, []);

  // States for form fields
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState(""); // "female" or "male"
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // State for validation errors
  const [errors, setErrors] = useState({});

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!dob) {
      newErrors.dob = "Date of Birth is required";
    }

    if (!gender) {
      newErrors.gender = "Please select a gender";
    }

    if (!selectedCountryCode) {
      newErrors.countryCode = "Country code is required";
    }

    if (!mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    }

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "A valid email is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // Clear errors and process form submission
      setErrors({});
      console.log("Form submitted successfully!");

      // Store the data in session storage
      const doctorData = {
        name,
        dob,
        gender,
        countryCode: selectedCountryCode,
        mobile,
        email,
        password,
      };
      sessionStorage.setItem("doctorData", JSON.stringify(doctorData));
      navigate("/Doctor2")
      // Optionally reset the form fields
      // setName("");
      // setDob("");
      // setGender("");
      // setMobile("");
      // setEmail("");
      // setPassword("");
      // setConfirmPassword("");
    }
  };

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

      <div className="container1">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="name">
              <i className="fas fa-user"></i> Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Dr Ahmed"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          <div className="form-row">
            <label htmlFor="dob">
              <i className="fa-regular fa-calendar"></i> Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
            {errors.dob && <span className="error">{errors.dob}</span>}
          </div>

          <div className="form-row">
            <label>Gender</label>
            <div className="gender">
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                checked={gender === "female"}
                onChange={(e) => setGender(e.target.value)}
              />
              <label htmlFor="female">Female</label>
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                checked={gender === "male"}
                onChange={(e) => setGender(e.target.value)}
              />
              <label htmlFor="male">Male</label>
            </div>
            {errors.gender && <span className="error">{errors.gender}</span>}
          </div>

          <div className="form-row">
            <label htmlFor="mobile">
              <i className="fa-solid fa-phone"></i> Mobile Number
            </label>
            <div className="mobile-input">
              <select
                id="country-codes"
                value={selectedCountryCode}
                onChange={(e) => setSelectedCountryCode(e.target.value)}
              >
                {countryCodes.length > 0 ? (
                  countryCodes.map((country) => (
                    <option key={country.cca2} value={country.code}>
                      {country.cca2} (+{country.code})
                    </option>
                  ))
                ) : (
                  <option value="">Loading...</option>
                )}
              </select>
              {errors.countryCode && (
                <span className="error">{errors.countryCode}</span>
              )}
              <input
                type="text"
                id="mobile"
                placeholder="+201254748802"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
              {errors.mobile && <span className="error">{errors.mobile}</span>}
            </div>
          </div>

          <div className="form-row">
            <label htmlFor="email">
              <i className="fa-solid fa-envelope"></i> Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="user@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-row">
            <label htmlFor="password">
              <i className="fa-solid fa-lock"></i> Password
            </label>
            <div className="input-with-icon">
              <input
                type="password"
                id="password"
                placeholder="12345678"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <i className="fa-solid fa-lock icon"></i>
            </div>
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
          </div>

          <div className="form-row">
            <label htmlFor="confirm-password">
              <i className="fa-solid fa-lock"></i> Confirm Password
            </label>
            <div className="input-with-icon">
              <input
                type="password"
                id="confirm-password"
                placeholder="12345678"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <i className="fa-solid fa-lock icon"></i>
            </div>
            {errors.confirmPassword && (
              <span className="error">{errors.confirmPassword}</span>
            )}
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
