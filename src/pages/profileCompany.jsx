import React, {useEffect,useState} from "react";
import './profileCompany.css';
import { useNavigate } from "react-router-dom";




function ProfileCompany(){
    const navigate = useNavigate();

    const uploadJobPage =(e)=>{
        navigate('/upload-job');
    }

    return(
        <div className='profilePage'>
        <div className='profileHeader'><button onClick={uploadJobPage}>Upload job</button></div>
        <div className='profileContent'> 
            <div className='profileImageDiv'></div>
            <div className='detailsDiv'></div>
            <div className='aboutMeDiv'></div>
            <div className='experienceDiv'></div>
        </div>
    </div>
    )
}

export default ProfileCompany;