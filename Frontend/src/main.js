import * as React from 'react';
import { useState, useEffect } from 'react';
import maleavatar from "./images/MaleAvatar.png";
import femaleavatar from "./images/FemaleAvatar1.png";
import RechartsPieChart from './RechartsPieChart';
import { Link } from 'react-router-dom';
import { Modal, Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import './main.css';

const HomePage = () => {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('userInfo')));
  const [value, setValue] = useState(dayjs());

  // Appointments stored in state for updates
  const [appointmentsData, setAppointmentsData] = useState([
    {
      id: 1,
      name: "John Doe",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      date: "2025-02-20 10:00 AM to 11:00 AM",
      gender: "Male",
      dob: "1985-04-12",
      type: "Clinic",
      status: "Booked",
    },
    {
      id: 2,
      name: "Jane Smith",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
      date: "2025-02-20 11:30 AM to 12:30 PM",
      gender: "Female",
      dob: "1990-08-25",
      type: "Online",
      status: "Completed",
    },
    {
      id: 3,
      name: "Robert Brown",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
      date: "2025-02-20 02:00 PM to 03:00 PM",
      gender: "Male",
      dob: "1978-12-05",
      type: "Clinic",
      status: "Canceled",
    },
    {
      id: 4,
      name: "Michael Green",
      image: "https://randomuser.me/api/portraits/men/4.jpg",
      date: "2025-02-20 03:00 PM to 04:00 PM",
      gender: "Male",
      dob: "1992-06-15",
      type: "Online",
      status: "NoShow",
    },
    
  ]);

  // State for filtering appointments by status
  const [statusFilter, setStatusFilter] = useState("");
  // Derive filtered appointments based on the selected status
  const filteredAppointments = appointmentsData.filter(appointment => {
    return !statusFilter || appointment.status === statusFilter;
  });

  // State for cancellation confirmation dialog
  const [cancelingAppointment, setCancelingAppointment] = useState(null);

  // State for editing appointment time dialog
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [editValue, setEditValue] = useState(dayjs());

  // Open cancellation dialog
  const handleOpenCancelDialog = (appointment) => {
    setCancelingAppointment(appointment);
  };

  // Confirm cancellation: update status and close dialog
  const handleConfirmCancel = () => {
    if (cancelingAppointment) {
      setAppointmentsData(prev =>
        prev.map(appt =>
          appt.id === cancelingAppointment.id ? { ...appt, status: "Canceled" } : appt
        )
      );
      setCancelingAppointment(null);
    }
  };

  // Close cancellation dialog
  const handleCloseCancelDialog = () => {
    setCancelingAppointment(null);
  };

  // Open edit dialog; prefill with appointment's start time
  const handleInitiateEdit = (appointment) => {
    setEditingAppointment(appointment);
    const startTime = appointment.date.split(" to ")[0]; // e.g., "2025-02-20 10:00 AM"
    setEditValue(dayjs(startTime));
  };

  // Save the edited time and update the appointment
  const handleSaveEdit = () => {
    if (editingAppointment) {
      const newTime = editValue.format('YYYY-MM-DD hh:mm A');
      let newDateString = newTime;
      if (editingAppointment.date.includes(" to ")) {
        const parts = editingAppointment.date.split(" to ");
        newDateString = `${newTime} to ${parts[1]}`;
      }
      setAppointmentsData(prev =>
        prev.map(appt =>
          appt.id === editingAppointment.id ? { ...appt, date: newDateString } : appt
        )
      );
      setEditingAppointment(null);
    }
  };

  // Cancel editing and close the edit dialog
  const handleCancelEdit = () => {
    setEditingAppointment(null);
  };

  // Appointment row component
  const AppointmentRow = ({ appointment }) => {
    return (
      <tr>
        <td>
          <div className="patient-info">
            <img src={appointment.image} alt={appointment.name} />
            <span>{appointment.name}</span>
          </div>
        </td>
        <td>{appointment.date}</td>
        <td>{appointment.gender}</td>
        <td>{appointment.dob}</td>
        <td>{appointment.type}</td>
        <td>
          <span className={`status status-${appointment.status.toLowerCase()}`}>
            {appointment.status}
          </span>
        </td>
        <td>
          <div className="dropdown">
            <i className="fas fa-ellipsis-h dropdown-toggle" title="Actions"></i>
            <div className="dropdown-menu">
              <Link to="#" className="dropdown-item">
                <i className="fas fa-comment-dots"></i>Message Patient
              </Link>
              <a href="#" className="dropdown-item">
                <i className="fas fa-info-circle"></i>View More Details
              </a>
              <a
                href="#"
                className="dropdown-item"
                onClick={() => handleOpenCancelDialog(appointment)}
              >
                <i className="fas fa-times"></i>Cancel Appointment
              </a>
              <a
                href="#"
                className="dropdown-item"
                onClick={() => handleInitiateEdit(appointment)}
              >
                <i className="fas fa-edit"></i>Edit Time
              </a>
              <Link to={'/meet'} className="dropdown-item">
                <li className="material-icons">video_call</li>
                Start Video Call
              </Link>
            </div>
          </div>
        </td>
      </tr>
    );
  };

  // Dropdown toggle logic
  useEffect(() => {
    const handleClick = (event) => {
      const isToggle = event.target.closest(".dropdown-toggle");
      document.querySelectorAll(".dropdown-menu.show").forEach((menu) => {
        if (!isToggle || menu !== isToggle.nextElementSibling) {
          menu.classList.remove("show");
        }
      });
      if (isToggle) {
        event.stopPropagation();
        isToggle.nextElementSibling.classList.toggle("show");
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <>
      <div className="homebody">
        <div
          className={`doctorh-card animate__animated animate__backInUp ${user.gender === 1 ? 'male' : 'female'}`}
        >
          <div className="docinfo animate__animated animate__jackInTheBox animate__delay-1s">
            <p className="greeting">Welcome back, Have a nice day at work!</p>
            <h1 className="DoctorName">Dr. John Smith</h1>
            <p className="specialities">MD, DM (Internal Medicine), FACP</p>
            <h2 className="todaysApp">
              You have total <span>10 Appointments</span> today!
            </h2>
          </div>
          <img
            src={user.gender === 1 ? maleavatar : femaleavatar}
            alt={`${user.gender === 1 ? 'male' : 'female'} Doctor Avatar`}
            className="animate__animated animate__backInRight animate__delay-1s"
          />
        </div>

        <h4
          className="animate__animated animate__backInLeft"
          style={{
            fontSize: '32px',
            color: 'var(--secondary-accent)',
            marginLeft: '50px',
            marginBottom: '1rem'
          }}
        >
          Statistics
        </h4>

        <div className="cards-container">
          <div className="wrapcm">
            <div className="r1 animate__animated animate__backInLeft animate__delay-1s">
              <div className="cardh purple">
                <div className="icon-container">
                  <span className="material-icons">calendar_today</span>
                </div>
                <div>
                  <h3>250</h3>
                  <p>Appointments</p>
                </div>
              </div>
              <div className="cardh red">
                <div className="icon-container">
                  <span className="material-icons">person</span>
                </div>
                <div>
                  <h3>250</h3>
                  <p>Total Patients</p>
                </div>
              </div>
              <div className="cardh orange">
                <div className="icon-container">
                  <span className="material-icons">medical_services</span>
                </div>
                <div>
                  <h3>150</h3>
                  <p>Clinic Consulting</p>
                </div>
              </div>
              <div className="cardh blue">
                <div className="icon-container">
                  <span className="material-icons">videocam</span>
                </div>
                <div>
                  <h3>100</h3>
                  <p>online Consulting</p>
                </div>
              </div>
            </div>

            <div className="r2 animate__animated animate__backInLeft animate__delay-2s">
              <div className="cardh green">
                <div className="icon-container">
                  <span className="material-icons">event_busy</span>
                </div>
                <div>
                  <h3>5%</h3>
                  <p>No-Show Rates</p>
                </div>
              </div>
              <div className="cardh teal">
                <div className="icon-container">
                  <span className="material-icons">cancel</span>
                </div>
                <div>
                  <h3>10</h3>
                  <p>Canceled Appointments</p>
                </div>
              </div>
              <div className="cardh indigo">
                <div className="icon-container">
                  <span className="material-icons">star</span>
                </div>
                <div>
                  <h3>4.8 / 5 ⭐</h3>
                  <p>Consultation Ratings</p>
                </div>
              </div>
              <div className="cardh cyan">
                <div className="icon-container">
                  <span className="material-icons">schedule</span>
                </div>
                <div>
                  <h3>12 min</h3>
                  <p>Average Waiting Time</p>
                </div>
              </div>
            </div>
          </div>
          <RechartsPieChart />
        </div>

        {/* Schedule List */}
        <div className="schedule-section">
          <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span
              style={{
                fontSize: '24px',
                color: 'var(--secondary-accent)',
                fontWeight: 'bold',
                marginLeft: '20px'
              }}
            >
              Schedule List:
            </span>
            <div className="search-filter-wrapper">
              <div className="search-bar">
                <i className="fas fa-search search-icon"></i>
                <input type="text" placeholder="Search Appointment, Patient or etc" />
              </div>
              <div className="filter-dropdown">
                <label htmlFor="appointment-status" className="filter-label">Filter By</label>
                <select
                  name="appointment-status"
                  id="appointment-status"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="">All Statuses</option>
                  <option value="Booked">Booked</option>
                  <option value="Completed">Completed</option>
                  <option value="Canceled">Canceled</option>
                  <option value="NoShow">No Show</option>
                </select>
              </div>
            </div>
          </div>
          <div style={{ maxHeight: "400px", overflowY: "auto" }}>
            <table className="appointment-table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Appointment Date &amp; Time</th>
                  <th>Gender</th>
                  <th>Date of Birth</th>
                  <th>Appointment Type</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map((appointment) => (
                  <AppointmentRow key={appointment.id} appointment={appointment} />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal for editing appointment time */}
        <Modal
          open={Boolean(editingAppointment)}
          onClose={handleCancelEdit}
          aria-labelledby="edit-appointment-modal"
          aria-describedby="edit-appointment-modal-description"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: { xs: '90%', sm: 400 },
              bgcolor: 'background.paper',
              border: '2px solid #1976d2',
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <Typography
              id="edit-appointment-modal"
              variant="h6"
              component="h2"
              gutterBottom
              sx={{ fontWeight: 'bold', textAlign: 'center', mb: 3 }}
            >
              Edit Appointment Time
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Select new time"
                value={editValue}
                onChange={(newValue) => setEditValue(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    sx={{
                      mt: 2,
                      '& .MuiOutlinedInput-root': { borderRadius: 2 },
                      '& .MuiInputLabel-root': { fontSize: '1rem', color: 'text.secondary' },
                    }}
                  />
                )}
              />
            </LocalizationProvider>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                mt: 3,
              }}
            >
              <Button onClick={handleSaveEdit} variant="contained" color="primary" sx={{ mr: 2 }}>
                Save
              </Button>
              <Button onClick={handleCancelEdit} variant="outlined" color="secondary">
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>

        {/* MUI Dialog for cancellation confirmation */}
        <Dialog 
          open={Boolean(cancelingAppointment)} 
          onClose={handleCloseCancelDialog}
          fullWidth
          maxWidth="xs"
          PaperProps={{
            sx: {
              borderRadius: 4,
              boxShadow: 24,
            },
          }}
        >
          <DialogTitle
            sx={{
              backgroundColor: 'error.main',
              color: 'white',
              textAlign: 'center',
              fontWeight: 'bold',
              py: 2,
            }}
          >
            Cancel Appointment
          </DialogTitle>
          <DialogContent
            sx={{
              textAlign: 'center',
              py: 3,
              fontSize: '1rem',
            }}
          >
            Are you sure you want to cancel this appointment?
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: 'center',
              pb: 2,
            }}
          >
            <Button onClick={handleConfirmCancel} variant="contained" color="error" sx={{ mr: 2 }}>
              Yes
            </Button>
            <Button onClick={handleCloseCancelDialog} variant="outlined" color="primary">
              No
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default HomePage;
