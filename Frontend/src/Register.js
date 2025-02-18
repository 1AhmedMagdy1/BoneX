import React from 'react'
import logo from './images/Logo.png'
import './register.css'
const Register = () => {
  return (
    <div className="main-container">
    <div className="form-container">
     
        <div >
            <img className='logo' src={logo} alt="Bonex Logo" />
        </div>

        <form>
          
            <div className="form-group">
                <div className="input-group">
                    <span >UserName</span>
                    <input type="text" />
                </div>
                <div className="input-group">
                    <span>Email</span>
                    <input type="email" />
                </div>
                
                
            </div>
            <div className="form-group">
                <div className="input-group">
                    <span>Password</span>
                    <input type="password" /> 
                </div>
                <div className="input-group">
                    <span>Confirm Password</span>
                    <input type="password" />
                </div>
                 
                
            </div>
            <div className="form-group">
                <div className="input-group">
                    <span>Telephone</span>
                    <input type="tel" />
                </div>
                <div className="input-group">
                    <span>Address</span>
                    <input type="text" />
                </div>
                 
               
            </div>
          
        </form>  
   
        
        
        <div className="signup"> 
            <button type="submit">SignUp 
                <i className='bx bx-chevrons-right'   style={{fontSize:'17px;'}}></i> 
            </button>
        </div>
        <div className="line">
            <span className="or">Or Countine With </span>
        </div>

        <div className="social-login">
            <i className='bx bxl-facebook-circle' style={{ fontSize: '40px', color: '#1877F2' }}></i>
            <i className='bx bxl-google' style={{ fontSize: '40px', color: '#DB4437' }} ></i>
            <i className='bx bxl-apple' style={{ fontSize: '40px', color: '#000' }}></i>
        </div>
        
        
    </div>

    <div className="info">
        <div className="info-section">
            <h3>Why Register?</h3>
            <p>. Consult Doctors Anytime.<br />. No Travel. No Waiting Queue. Comfort of Your Home</p>
        </div>
        <div className="info-section">
            <h3>Are You a Doctor?</h3>
            <a href="#" className="signup-btn">
                sign up here 
                <i className='bx bx-chevrons-right'></i> 
            </a>
        </div>
        
        
    </div>
</div>
  );
};

export default Register