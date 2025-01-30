import React, {useEffect, useState} from 'react';
import './jobListings.css'
import Header from '../../components/Header/header'
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";


function JobListings(){
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState([]);
    const [loading, setLoading] = useState(true);
    const [authorization, setAuthorization]=useState(false);
    const location = useLocation();
    
    
    const {categoryFilter} = location.state || {};
        
    
    const [role, setRole] = useState();
    const navigate=useNavigate();

    

    

    useEffect(() =>{
      const token = localStorage.getItem('token');
    if(token){
      setAuthorization(true);
      const decoded = jwtDecode(token);
      setRole(decoded.user_role);
      console.log(role);
      console.log("This is it!!!!!!!!!!!!!:"+categoryFilter);
    }
  
    fetch(`http://192.168.100.7/api/listJobs.php?category=${categoryFilter}`)
        .then(response => response.json())
        .then(data =>{
            if(data.status === 'success'){
                setJobs(data.data);
            }else{
                setError(data.message);        }
    })
    .catch(() => {
        setError('Failed to fetch data.'); 
      })
      .finally(() => setLoading(false));
    
    },[]);
    if(loading) return <p>loading...</p>;
    
    const handleNavigateToJob = (id) => {
      navigate('/job-page', {
        state: { jobId: id },
      });
    };


    return (
      <div className='job-listings-div d-flex flex-column align-items-center'>
          <Header role={role} authorizationStatus={authorization}></Header>
          <div className="job-listings-container row col-9 listing-page mt-3">

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
              <div key={job.id} className="job-div col-12 col-md-6  col-lg-4 p-4">
                <div className="job-time-and-location-div-container row justify-content-between">
                    <div className="job-time-and-location-div w-auto">Full Time</div>
                    <div className="job-time-and-location-div w-auto">
                      {job.location}
                    </div>
                  </div>
                  <div className="logo-and-title-container">
                    <img className="logo-div" src={job.profile_image}></img>
                    <div className="home-page-listing-title text-truncate" style={{maxWidth:"18rem"}}>{job.title}</div>
                  </div>
                  <div className="home-page-job-details-div">
                    <p style={{maxHeight:"1.25rem"}}>{job.category}</p><div style={{width:"1px",height:"1rem",background:"grey", marginTop:"-12px"}} ></div>
                    {(job.salary) ? (<p>${job.salary}</p>) :

                    (job.minSalary && job.maxSalary) ? (<p>${job.minSalary}-{job.maxSalary}</p>) :
                    (job.minSalary) ? (<p>${job.minSalary}-?</p>) : (<p>$?-{job.maxSalary}</p>) 
                    }
                    
                    <p>/Monthly</p>
                  </div>
                  {(role=='company') ? (
                    <p>You can't apply for job as a company but you are free to check out details</p>
                  ) : (
                  <button className="home-page-job-listing-button col-12" onClick={()=>handleNavigateToJob(job.id)}>
                    Apply Now
                  </button>
                  )}
                <div>
                  
                </div>
              </div>
            );
          })}
        </div>
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