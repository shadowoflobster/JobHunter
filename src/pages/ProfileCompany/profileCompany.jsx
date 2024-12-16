import React, {useEffect,useState} from "react";
import './profileCompany.css';
import { useNavigate } from "react-router-dom";
import Header from '../../components/Header/header'
import { jwtDecode } from 'jwt-decode';




function ProfileCompany(){
    //Const to check if user is authorized or not
    const [authorization, setAuthorization] = useState(false);
    const [role, setRole] = useState();

    const navigate = useNavigate();

    //Get token from local Storage, if toke exists user is authorized
    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(token){
              setAuthorization(true);
              const decoded = jwtDecode(token);
              setRole(decoded.user_role);
              console.log(role);
            }
    })
    


    return(
        <div className='profilePage'>
        {/*Company profile has role of company and passes it to header prop, also passes authorization status*/}
        <Header role="company" authorizationStatus={authorization ? true : false}></Header>
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