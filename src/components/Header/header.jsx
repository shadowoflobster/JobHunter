import React, { useState, useRef } from "react";
import "./header.css";
import { useNavigate } from "react-router-dom";

const Header = ({ role, authorizationStatus }) => {
  const [hovered, setHovered] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setHovered(true);
  };
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHovered(false);
    }, 200);
  };

  const navigate = useNavigate();

  function goToListings() {
    navigate("/job-listings");
  }
  function goToLogin(){
    navigate("/");
  }
  function goToRegister() {
    navigate("/register");
  }

  function goToProfile() {
    if (role === "user") {
      navigate("/profile");
    } else if (role === "company") {
      navigate("/profile-company");
    }
  }

  return (
    <div className="header">
      <div className="header-logo" onClick={()=>navigate("/home-page")}></div>
      {(role === "company") && (
        <button className="upload-job-btn" onClick={()=>navigate('/upload-job')}>Upload job</button>
        )}
      <nav className="header-navigation">
        <ul className="header-list">
          <li className="header-list-item">
            <a className="header-list-item-link" href="./home-page">Home</a>
          </li>
          <li className="header-list-item">
            <a className="header-list-item-link"  href="/job-listings">Jobs</a>
          </li>
          <li className="header-list-item">
            <a className="header-list-item-link"  href="/categories">Categories</a>
          </li>
          <li className="header-list-item">
            <a className="header-list-item-link"  href="/about">About</a>
          </li>
          <li className="header-list-item">
            <a className="header-list-item-link"  href="/contact">Contact</a>
          </li>
        </ul>
      </nav>
      <div className="header-right-content-div">
        {authorizationStatus ? (
          <div
            className="header-profile-div"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="header-profile" onClick={goToProfile}></div>
            <div
              className="header-profile-menu"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{ display: hovered ? "block" : "none" }}
            >
              <div className="header-profile-menu-item">Profile</div>
              <div className="header-profile-menu-item">Settings</div>
              <div className="header-profile-menu-item">Log out</div>
            </div>
          </div>
        ) : (
            <div className="header-authorize-div">
                <button className="header-login-button" onClick={goToLogin}>Sign in</button>
                <button className="header-signup-button" onClick={goToRegister}>Create an account</button>

            </div>
        )}
      </div>
    </div>
  );
};
export default Header;

