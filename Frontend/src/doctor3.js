import React, { useState, useRef, useEffect } from "react";
import personalImg from "./images/personal.webp";
import graduateImg from "./images/graduate.webp";
import professionalImg from "./images/professional.png";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import axios from "axios";
import AwardModal from "./AwardModal";
import "./doctor3.css";

const Doctor3 = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [uploadedAwardFile, setUploadedAwardFile] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sh, setsh] = useState(false);

  const [clinicName, setClinicName] = useState("");
  const [experience, setExperience] = useState("");
  const [docbrief, setDocbrief] = useState("");
  const [fees, setFees] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation not supported.");
    }
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedAwardFile(file);
    }
  };

  // Helper: Retrieve an academic file (e.g., degree certificate or additional certification) from IndexedDB.
  const getAcademicFileFromDB = async (fileCategory) => {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open("AcademicFilesDB", 1);
      request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction("files", "readonly");
        const store = transaction.objectStore("files");
        const cursorRequest = store.openCursor();
        cursorRequest.onsuccess = (event) => {
          const cursor = event.target.result;
          if (cursor) {
            if (cursor.value.fileCategory === fileCategory) {
              resolve(cursor.value);
              return;
            }
            cursor.continue();
          } else {
            resolve(null);
          }
        };
        cursorRequest.onerror = (event) => reject(event.target.error);
      };
      request.onerror = (event) => reject(event.target.error);
    });
  };

  // Helper: Retrieve the user profile picture from IndexedDB.
  const getUserPicFromDB = async () => {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open("DoctorFilesDB", 1);
      request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction("files", "readonly");
        const store = transaction.objectStore("files");
        const cursorRequest = store.openCursor();
        cursorRequest.onsuccess = (event) => {
          const cursor = event.target.result;
          if (cursor) {
            if (cursor.value.fileCategory === "userpic") {
              resolve(cursor.value);
              return;
            }
            cursor.continue();
          } else {
            resolve(null);
          }
        };
        cursorRequest.onerror = (event) => reject(event.target.error);
      };
      request.onerror = (event) => reject(event.target.error);
    });
  };

  // Helper: Retrieve the ID photo from IndexedDB.
  const getIdPhotoFromDB = async () => {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open("DoctorFilesDB", 1);
      request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction("files", "readonly");
        const store = transaction.objectStore("files");
        const cursorRequest = store.openCursor();
        cursorRequest.onsuccess = (event) => {
          const cursor = event.target.result;
          if (cursor) {
            if (cursor.value.fileCategory === "idPhoto") {
              resolve(cursor.value);
              return;
            }
            cursor.continue();
          } else {
            resolve(null);
          }
        };
        cursorRequest.onerror = (event) => reject(event.target.error);
      };
      request.onerror = (event) => reject(event.target.error);
    });
  };

  // Helper: Retrieve any missing files from IndexedDB.
  // This gathers userpic, idPhoto, and academic files that may have been stored on previous pages.
  const retrieveMissingFiles = async () => {
    const files = {};
    try {
      const userPicRecord = await getUserPicFromDB();
      if (userPicRecord && userPicRecord.fileData) {
        files.userpic = userPicRecord;
      }
      const idPhotoRecord = await getIdPhotoFromDB();
      if (idPhotoRecord && idPhotoRecord.fileData) {
        files.idPhoto = idPhotoRecord;
      }
      const degreeRecord = await getAcademicFileFromDB("degreeCertificate");
      if (degreeRecord && degreeRecord.fileData) {
        files.degreeCertificate = degreeRecord;
      }
      const postGradRecord = await getAcademicFileFromDB("postGradCertificate");
      if (postGradRecord && postGradRecord.fileData) {
        files.postGradCertificate = postGradRecord;
      }
    } catch (error) {
      console.error("Error retrieving missing files from IndexedDB:", error);
    }
    return files;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let formErrors = {};

    if (docbrief.trim() === "")
      formErrors.docbrief = "The brief is required";
    if (clinicName.trim() === "")
      formErrors.clinicName = "Clinic name is required";
    if (!experience || experience <= 0)
      formErrors.experience = "Years of experience must be greater than 0";
    if (!fees || fees <= 0)
      formErrors.fees = "Consultation fees must be greater than 0";
    if (!startTime || !endTime) {
      formErrors.hours = "Both start and end times are required";
    } else if (startTime >= endTime) {
      formErrors.hours = "End time must be after start time";
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    } else {
      setErrors({});
    }

    setLoading(true);

    // Retrieve stored data (e.g., from RegisterDoctor1)
    const doctorDataStr = sessionStorage.getItem("doctorData");
    const academicDataStr = sessionStorage.getItem("academicData");
    const doctorData = doctorDataStr ? JSON.parse(doctorDataStr) : {};
    const academicData = academicDataStr ? JSON.parse(academicDataStr) : {};

    // Parse numeric values to the correct types:
    const parsedExperience = parseInt(experience, 10);
    const parsedFees = parseFloat(fees);
    const parsedGraduationYear = academicData.gradYear ? parseInt(academicData.gradYear, 10) : null;

    const combinedData = {
      ...doctorData,
      ...academicData,
      professionalData: {
        clinicName,
        docbrief,
        experience: parsedExperience,
        fees: parsedFees,
        hours: `${startTime} - ${endTime}`,
        awardFile: uploadedAwardFile ? uploadedAwardFile.name : null,
      },
    };

    // Store complete form data in session storage.
    sessionStorage.setItem("completeDoctorData", JSON.stringify(combinedData));

    const formData = new FormData();
    formData.append("Email", combinedData.email);
    formData.append("Password", combinedData.password);
    formData.append("FirstName", combinedData.name);
    formData.append("LastName", combinedData.name);
    formData.append("DateOfBirth", combinedData.dob);
    formData.append("Gender", combinedData.gender === "male" ? 1 : 2);
    formData.append("PhoneNumber", "+2011155006348");
    formData.append("Speciality", combinedData.speciality || "");
    formData.append("UniversityName", combinedData.university);
    // Append graduation year if present
    if (parsedGraduationYear) {
      formData.append("GraduationYear", parsedGraduationYear);
    }
    formData.append("YearsOfExperience", parsedExperience);
    formData.append("ConsultationHours", `${startTime} - ${endTime}`);
    formData.append("ConsultationFees", parsedFees);
    formData.append("WorkplaceName", clinicName);
    formData.append("Brief", docbrief);

    if (location) {
      // Geolocation API returns numbers by default.
      formData.append("Latitude", location.latitude);
      formData.append("Longitude", location.longitude);
    }

    try {
      // Retrieve any missing files from IndexedDB.
      const missingFiles = await retrieveMissingFiles();

      // Append profile picture.
      if (missingFiles.userpic && missingFiles.userpic.fileData) {
        formData.append("ProfilePicture", missingFiles.userpic.fileData);
      }
      // Append ID photo.
      if (missingFiles.idPhoto && missingFiles.idPhoto.fileData) {
        formData.append("IdPhoto", missingFiles.idPhoto.fileData);
      }
      // Append academic files.
      if (missingFiles.degreeCertificate && missingFiles.degreeCertificate.fileData) {
        formData.append("DegreeCertificate", missingFiles.degreeCertificate.fileData);
      }
      if (missingFiles.postGradCertificate && missingFiles.postGradCertificate.fileData) {
        formData.append("AdditionalCertification", missingFiles.postGradCertificate.fileData);
      }
    } catch (dbError) {
      console.error("Error retrieving files from IndexedDB:", dbError);
    }

    // For AwardsOrRecognitions, note that the API schema expects an array.
    if (uploadedAwardFile) {
      formData.append("AwardsOrRecognitions", uploadedAwardFile);
    }

    try {
      const response = await axios.post(
        "http://bonex.runasp.net/Doctor/register",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 200) {
        sessionStorage.setItem("anuser", true);
        const userData = {
          email: combinedData.email,
          firstName: combinedData.name,
          lastName: combinedData.name,
          gender: combinedData.gender === "male" ? 1 : 0,
          role: "doc",
        };
        sessionStorage.setItem("userInfo", JSON.stringify(userData));
        navigate("/homed");
        window.location.reload(true);
      }
    } catch (error) {
      console.error("API call failed:", error);
      sessionStorage.setItem("completeDoctorData", JSON.stringify(combinedData));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-container3">
      <h1 className="head animate__animated animate__backInDown">Professional Details</h1>
      <div className="div-line animate__animated animate__backInDown"></div>

      <div className="progress-bar1 animate__animated animate__backInDown">
        <div className="circle done">
          <img src={personalImg} alt="Personal Info" />
        </div>
        <div className="line"></div>
        <div className="circle done">
          <img src={graduateImg} alt="Graduation" />
        </div>
        <div className="line"></div>
        <div className="circle inactive">
          <img src={professionalImg} alt="Professional" />
        </div>
      </div>

      <div className="info-box1 animate__animated animate__slideInRight">
        <h2>Why Bonex?</h2>
        <hr />
        <ul>
          <li>
            • Consult over 10 million existing <span>online patients</span>.
          </li>
          <li>
            • Consult your patients via <span>query, video, or phone</span>.
          </li>
          <li>
            • Discuss <span>medical cases</span> with fellow Bonex doctors.
          </li>
          <li>
            • Grow your <span>online brand</span> by sharing content.
          </li>
        </ul>
      </div>

      <div className="award animate__animated animate__backInLeft">
        <h2>Awards/Recognitions</h2>
        <button type="button" onClick={() => setsh(true)}>
          Add Award
        </button>
        <span>
          Note: If you have trouble uploading certificates, email them to
          Bonex@Bonex.com.
        </span>
      </div>

      <h2 className="div-line" style={{ width: "50%", marginTop: "10px" }}></h2>

      <div className="container3 animate__animated animate__backInUp">
        <form onSubmit={handleFormSubmit}>
          <div className="form-row">
            <label>About You</label>
            <input
              type="text"
              placeholder="Write a brief about yourself"
              value={docbrief}
              onChange={(e) => setDocbrief(e.target.value)}
            />
            {errors.docbrief && <span className="error">{errors.docbrief}</span>}
          </div>

          <div className="form-row">
            <label>Clinic Name</label>
            <input
              type="text"
              placeholder="Enter your Clinic Name or address"
              value={clinicName}
              onChange={(e) => setClinicName(e.target.value)}
            />
            {errors.clinicName && <span className="error">{errors.clinicName}</span>}
          </div>

          <div className="form-row">
            <label>Years of Experience</label>
            <input
              type="number"
              placeholder="e.g., 5"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            />
            {errors.experience && <span className="error">{errors.experience}</span>}
          </div>

          <div className="form-row">
            <label>Consultation Fees</label>
            <input
              type="number"
              placeholder="e.g., 50"
              value={fees}
              onChange={(e) => setFees(e.target.value)}
            />
            {errors.fees && <span className="error">{errors.fees}</span>}
          </div>

          <div className="form-row">
            <label>Consultation Hours (Start & End)</label>
            <div style={{ display: "flex", gap: "1rem" }}>
              <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
              <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
            </div>
            {errors.hours && <span className="error">{errors.hours}</span>}
          </div>

          <AwardModal sh={sh} onClose={() => setsh(false)} />

          <button type="submit" className="submit-btn">
            Submit &amp; Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Doctor3;
