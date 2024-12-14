import React from "react";
import './header.css'
import { useNavigate } from "react-router-dom";

const Header =({role,authorizationStatus})=>{

    const navigate = useNavigate();


    function goToListings(){
        navigate('/job-listings');
    }
    function goToProfile(){
        if(role === "user"){
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
            <div className="header-profile" onClick={goToProfile}></div>
    )}
    </div>
}
export default Header;