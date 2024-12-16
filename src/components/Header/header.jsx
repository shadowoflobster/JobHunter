import React, {useState } from "react";
import './header.css'
import { useNavigate } from "react-router-dom";

const Header =({role,authorizationStatus})=>{

    const [hovered,setHovered] = useState(false);

    const handleMouseEnter = () =>{
        setHovered(true);
    }
    const handleMouseLeave =() =>{
        setHovered(false);
    }


    const navigate = useNavigate();




   



    function goToListings(){
        navigate('/job-listings');
    }
    function goToProfile(){
        if(role === 'user'){
            navigate('/profile');
        }else if(role === "company"){
            navigate('/profile-company')
        }
    }

    return <div className="header">
        <div className="header-logo" onClick={goToListings}></div>
        {(role === "company") && (
        <button className="upload-job-btn" onClick={()=>navigate('/upload-job')}>Upload job</button>
        )}

      {(authorizationStatus)&&(
        <div className="header-profile-div" onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
            <div className="header-profile" onClick={goToProfile} ></div>
            <div className="header-profile-menu" style={{display:hovered? 'block' : 'none'}} >
                <div className="header-profile-menu-item">Profile</div>
                <div className="header-profile-menu-item">Settings</div>
                <div className="header-profile-menu-item">Log out</div>
            </div>
            </div>
    )}
    </div>
}
export default Header;