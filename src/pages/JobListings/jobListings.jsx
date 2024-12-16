import React, {useEffect, useState} from 'react';
import './jobListings.css'
import Header from '../../components/Header/header'
import { jwtDecode } from 'jwt-decode';


function JobListings(){
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState([]);
    const [loading, setLoading] = useState(true);
    const [authorization, setAuthorization]=useState(false);
    const [role, setRole] = useState();


    

    useEffect(() =>{
      const token = localStorage.getItem('token');
    if(token){
      setAuthorization(true);
      const decoded = jwtDecode(token);
      setRole(decoded.user_role);
      console.log(role);
    }
    fetch('http://localhost/api/listJobs.php')
        .then(response => response.json())
        .then(data =>{
            if(data.status === 'success'){
                setJobs(data.data);
            }else{
                setError(data.message);        }
    })
    .catch(() => {
        setError('Failed to fetch data.'); // Handle network errors
      })
      .finally(() => setLoading(false));
    
    },[]);
    if(loading) return <p>loading...</p>;
    
    return (
        <div className="jobListingsDiv">
          <Header role={role} authorizationStatus={authorization}></Header>
          {jobs.map((job) => {
            let requirements = [];
    
            if (typeof job.requirements === 'string') {
              try {
                requirements = JSON.parse(job.requirements);
              } catch {
                requirements = job.requirements.split(',').map((req) => req.trim());
              }
            } else if (Array.isArray(job.requirements)) {
              requirements = job.requirements; 
            }
    
            return (
              <div key={job.id} className="jobDiv">
                <p>{job.title}</p>
                <p>{job.description}</p>
                <p>
                  ხელფასი: {job.salary} {job.currency}
                </p>
                <p>{job.location}</p>
                <p>Company: {job.company_name}</p>
                <div>
                  <strong>Requirements:</strong>
                  {requirements.length > 0 ? (
                    requirements.map((req, index) => <p key={index}>{req}</p>)
                  ) : (
                    <p>No requirements listed.</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      );
    }
    

export default JobListings;


// <div className='job-listings-container'>
//              <div className='job-div'>
//                 <div className='job-time-and-location-div-container'>
//                 <div className='job-time-and-location-div'>Full Time</div>
//                 <div className='job-time-and-location-div'>Glendale, CA</div>
//                 </div>
//                 <div className='logo-and-title-container'>
//                     <div className='logo-div'></div>
//                     <div className='listing-title'>Product Manager</div>
//                 </div>
//              </div>
             
             
             
             
             
             
             
             
             
//              <div className='job-div'>
//                 <div className='job-time-and-location-div-container'>
//                 <div className='job-time-and-location-div'>Full Time</div>
//                 <div className='job-time-and-location-div'>Glendale, CA</div>
//                 </div>
//              </div> <div className='job-div'>
//                 <div className='job-time-and-location-div-container'>
//                 <div className='job-time-and-location-div'>Full Time</div>
//                 <div className='job-time-and-location-div'>Glendale, CA</div>
//                 </div>
//              </div> <div className='job-div'>
//                 <div className='job-time-and-location-div-container'>
//                 <div className='job-time-and-location-div'>Full Time</div>
//                 <div className='job-time-and-location-div'>Glendale, CA</div>
//                 </div>
//              </div>
                
                
//             </div>