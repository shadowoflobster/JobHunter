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
    const categoriesWithIcons = {
      "IT": "bi-pc-display",
      "Engineering": "bi-gear-wide-connected",
      "Medical": "bi-heart-pulse",
      "Education": "bi-mortarboard",
      "Finance": "bi-cash-stack",
      "Sales": "bi-cart",
      "Construction": "bi-hammer",
      "Hospitality": "bi-house-door",
      "Logistics": "bi-truck",
      "Legal": "bi-file-earmark-text",
      "Customer Service": "bi-headset",
      "Skilled Trades": "bi-tools",
      "Marketing": "bi-megaphone",
      "Human Resources": "bi-people",
      "Creative": "bi-palette",
      "Media": "bi-camera-reels",
      "Transportation": "bi-train-front",
      "Agriculture": "bi-flower1",
      "Manufacturing": "bi-buildings",
      "Real Estate": "bi-house",
      "Telecommunications": "bi-phone",
      "Energy": "bi-lightning-charge",
      "Pharmaceuticals": "bi-capsule",
      "Research & Development": "bi-search",
      "Public Sector": "bi-building",
      "Defense": "bi-shield-lock",
      "Aerospace": "bi-airplane",
      "Retail": "bi-bag",
      "Food Services": "bi-cup-straw",
      "Entertainment": "bi-film",
      "Sports": "bi-dribbble",
      "Nonprofit": "bi-heart",
      "Consulting": "bi-chat-right-dots",
      "Freelance": "bi-person-workspace",
      "Remote Work": "bi-laptop",
      "Internship": "bi-clipboard-check",
      "Administration": "bi-file-earmark-bar-graph",
      "Healthcare": "bi-hospital",
      "Tourism": "bi-geo-alt",
      "Beauty & Wellness": "bi-brush"
    };
    

    

    useEffect(() =>{
      const token = localStorage.getItem('token');
    if(token){
      setAuthorization(true);
      const decoded = jwtDecode(token);
      setRole(decoded.user_role);
      console.log(role);
      console.log("This is it!!!!!!!!!!!!!:"+categoryFilter);
    }
  
    fetch(`${process.env.REACT_APP_API_IP}/backend/api/listJobs.php?category=${categoryFilter}`)
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

    const formatDate=(timestamp)=>{
      const date = new Date(timestamp.replace(" ", "T"));
    const options = { year: "numeric", month: "2-digit", day: "2-digit", 
                      hour: "2-digit", minute: "2-digit", second: "2-digit" };
  
    return new Intl.DateTimeFormat("en-GB", options).format(date).replace(",", "");
    }
  
    const getTimeAgo=(updatedAt)=>{
      const updatedTime = new Date(updatedAt.replace(' ','T'));
      const now = new Date();
      const differenceInMilliseconds = now - updatedTime;
  
      const seconds = Math.floor(differenceInMilliseconds/1000);
      const minutes = Math.floor(seconds/60);
      const hours = Math.floor(minutes/60);
      const days = Math.floor(hours/24);
      const months = Math.floor(days/30);
      const years = Math.floor(months/12)
  
      if(years>0) return `${years} Years ago`;
      if(months>0) return `${months} Months ago`;
      if(days>0) return `${days} Days ago`;
      if(hours>0) return `${hours} Hours ago`;
      if(minutes>0) return `${minutes} Minutes ago`;
      return `${seconds} Seconds ago`;
  
  
    }
  
    const truncateText = (text, limit) => {
      return text.length > limit ? text.slice(0, limit) + "..." : text;
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
              <div className="col-6 col-sm-4 col-xl-2 d-flex p-2">
                  <div
                    className="col-12 d-flex flex-column p-3 gap-3 rounded secondary-color"
                    style={{cursor:"pointer" }}
                    key={job.id}
                    onClick={()=>handleNavigateToJob(job.id)}
                  >
                    <div className="col-12 rounde d-flex align-items-center justify-content-center" style={{height:"150px"}}>
                      <i className={categoriesWithIcons[job.category]} style={{fontSize:"6em", color:"white"}}></i>
                      </div>
                    <div><p className="m-0 p-0 text-white" style={{ fontSize:"0.6em"}}>{job.category}</p>
                    <div className="text-white" style={{fontSize:"1em", height:"2rem", maxHeight:"2rem"}}>{truncateText(job.title,35)}</div>
                    </div> 
                    <p className="text-white overflow-hidden" style={{ fontSize: "0.6em", maxHeight:"1rem" }}>
                      {truncateText(job.description,80)}
                    </p>
                    <div className="d-flex  align-items-center justify-content-between">
                      <div className="d-flex align-items-center gap-1">
                        <div className="text-white">{job.currency}</div>
                        <div className="text-white" style={{ fontSize: "0.6em" }}>
                          {job.salary
                            ? job.salary
                            : job.minSalary && job.maxSalary
                            ? `${job.minSalary}-${job.maxSalary}`
                            : job.minSalary
                            ? `${job.minSalary}-?`
                            : `?- ${job.maxSalary}`}
                        </div>
                      </div>
                      <div className="text-white" style={{fontSize:"0.5em"}}>{getTimeAgo(job.updated_at)}</div>
                    </div>
                    <div className="col-12 d-flex align-items-center pt-2 gap-1" style={{borderTop:"1.5px solid #2c3c57"}}>
                      <img className="job-listing-company-image" src={job.profile_image}/>
                      <p className="m-0 p-0 text-white" style={{fontSize:"0.5em"}}>{job.company_name}</p>
                    </div>
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