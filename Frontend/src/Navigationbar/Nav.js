import React, { useEffect,useState,useNavigate } from "react";

import { Link } from "react-router-dom";
import avtmale from '../images/avatar-male.jpg'
import avtfemale from '../images/avatarfm.webp'
import notification from '../images/notification.png'
import "./nav.css";

const Nav = () => {
  const [user, setUser] = useState(null);
  const [anUser, setAnUser] = useState("false");

  useEffect(() => {
    const data = sessionStorage.getItem('userInfo');
    

    if (data) {
      console.log('entered');
      

      setAnUser("true")
     
      
      const parsedUser = JSON.parse(data);
      console.log('parsedUser:', parsedUser);
      setUser(parsedUser);
    }
  }, []);

  return (
    <nav className="navbar">
      <Link to="/xray">X-ray Checker</Link>
      <Link to="/chat">Chat messages</Link>
      <Link to="/doctors">Doctors</Link>
      <Link to="/">Bonex</Link>
      
      {anUser === "true" ? (
        <div className="user-logged">
          <span className="user-name">{user.firstName}</span>
          <img src={(user.gender==="1"?avtmale:avtfemale)} alt="user-pic" />
          <img src={notification} alt="Notification Icon" />
        </div>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">SignUp</Link>
        </>
      )}
    
    </nav>
  );
};

export default Nav;
