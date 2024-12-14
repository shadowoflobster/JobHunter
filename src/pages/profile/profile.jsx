import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import './profile.css';
import Header from '../../components/Header/header'


function Profile(){
    const [user,setUser]= useState(null);
    const [error, setError]=useState(null);
    const [authorization, setAuthorization] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        const token = localStorage.getItem('token');


        if (token) {
            setAuthorization(true);
            fetch('http://localhost/api/profile.php', {
                method: 'GET',
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setUser(data.user);
                }
            })
            .catch(error => {
                setError('Error fetching user data');
                console.error('Error:', error);
            });
        } else {
            setError('No token found');
        }
    }, []);
            
        





    return (
        <div className='profilePage'>
        <Header role="user"  authorizationStatus={authorization ? true : false}></Header>
        
        {authorization && (
                <>
            <div className='profileContent'>
                <div className='profileImageDiv'></div>
                <div className='detailsDiv'></div>
                <div className='aboutMeDiv'></div>
                <div className='experienceDiv'></div>
            </div>
            </>
            )}
            
        </div>
    )
}

export default Profile;