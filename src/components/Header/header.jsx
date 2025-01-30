import React, { useState, useRef, useEffect } from "react";
import BurgerMenu from "../burgerMenu/BurgerMenu";
import "./header.css";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


const Header = ({ role, authorizationStatus }) => {
  const [hovered, setHovered] = useState(false);
  const [image, setImage]=useState(null);
  const [error, setError]=useState(null);
  const [burgerOpen, setBurgerOpen] = useState(false);
  const timeoutRef = useRef(null);
  const token = localStorage.getItem("token");
  if (token) {
    var decoded = jwtDecode(token);
  }
  useEffect(()=>{
    if(token && decoded){
      fetch("http://192.168.100.7/api/getImageUrl.php",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }, 
        body: JSON.stringify({user_id: decoded.user_id, user_role: decoded.user_role}),
      }).then((response)=>response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setImage(data.data);
          console.log(data.data); 
        }
      })
    }
  },[token])


  const handleBurgerOpen=()=>{
    if(burgerOpen){
      setBurgerOpen(false);
      console.log("burgerMenu: "+burgerOpen);
    }else{
      setBurgerOpen(true);
      console.log("burgerMenu: "+burgerOpen);
    }
  }



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
      navigate("/profile");
    
  }
  return (
    <div className="header row p-2" style={{width:"100%"}}>
      
      <div className="header-logo col-2" onClick={()=>navigate("/home-page")}></div>
      <nav className="header-navigation d-none d-sm-flex col-6 offset-1 justify-content-center align-center ">
        <ul className="header-list m-0 h-100 p-0">
          <li className="header-list-item d-flex align-items-center">
            <a className="header-list-item-link" href="./home-page">Home</a>
          </li>
          <li className="header-list-item d-flex align-items-center">
            <a className="header-list-item-link"  href="/job-listings">Jobs</a>
          </li>
          <li className="header-list-item d-flex align-items-center">
            <a className="header-list-item-link"  href="/categories-page">Categories</a>
          </li>
          <li className="header-list-item d-flex align-items-center">
            <a className="header-list-item-link"  href="/about">About</a>
          </li>
          <li className="header-list-item d-flex align-items-center">
            <a className="header-list-item-link"  href="/contact">Contact</a>
          </li>
        </ul>
      </nav>
      <div className="header-right-content-div col-1 offset-8 offset-sm-1 d-flex  align-items-center">
        {authorizationStatus ? (
          <div
            className="header-profile-div"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img className="header-profile" src={image?.profile_image} onClick={goToProfile}></img>
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
      <div className="col-1 d-flex d-sm-none align-items-center">
      <i className="bi bi-list " style={{fontSize:"2rem",cursor:"pointer"}} onClick={()=>handleBurgerOpen()}></i>
      </div>
      {burgerOpen ? (<BurgerMenu></BurgerMenu>):null}
    </div>
  );
};
export default Header;

