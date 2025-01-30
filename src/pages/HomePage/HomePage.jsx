import React, { useState, useEffect } from "react";
import Header from "../../components/Header/header";
import "./HomePage.css";
import searchIcon from "../../SVGs/searchIcon.svg";
import arrowIcon from "../../SVGs/viewAllArrow.svg";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function HomePage() {
  const navigate = useNavigate();
  const [role, setRole] = useState();
  const [authorization, setAuthorization] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthorization(true);
      const decoded = jwtDecode(token);
      setRole(decoded.user_role);
    }
    fetch("http://192.168.100.7/api/featuredJobs.php")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setJobs(data.data);
        } else {
          setError(data.message);
        }
      })
      .catch(() => {
        setError("Failed to fetch data."); // Handle network errors
      })
      .finally(() => setLoading(false));
  }, []);

  const handleNavigateToJob = (id) => {
    navigate('/job-page', {
      state: { jobId: id },
    });
  };


  return (
    <div className="home-page-div gap-2 d-flex flex-column justify-content-center align-items-center">
      <Header role={role} authorizationStatus={authorization}></Header>
      {/*Content 1*/}
      <div className="home-page-content-1 col-12 d-flex flex-column justify-content-center align-items-center">
        <h1 className="home-page-header col-8 text-center" >
          Bringing You Closer to Your Career Goals.
        </h1>
        <p className="text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, eiusmod sed
          do eiusmod
        </p>
        <div className="home-page-search-div row align-items-center col-11 col-md-8 col-lg-6 bg-white rounded-5" style={{height:"3.5rem"}}>
          <img className="home-page-search-icon col-1" src={searchIcon} alt="" />
          <input
            className="home-page-search-input col-8 col-xl-9 border-0"
            placeholder="Job Title, keywords......"
             style={{outline: "none"}}
          ></input>
          <button className="home-page-search-button col-3 col-xl-2 text-center h-100 border-0 bg-black rounded-5 text-white fs-4 cursor-pointer">Search</button>
        </div>
      </div>
      {/*Featured jobs*/}

      <div className="home-page-featured-jobs-div col-11">
        <div className="home-page-featured-jobs-head-div d-flex justify-content-between align-items-center">
          <h1 className="home-page-featured-jobs-header">Our Featured Jobs</h1>
          <button
            className="home-page-featured-jobs-header-button"
            onClick={() => {
              navigate("/job-listings");
            }}
          >
            View All <img src={arrowIcon}></img>
          </button>
        </div>
        {/*Home page listings*/}
        <div className="home-page-featured-jobs-list-div">
          {/*Job listings*/}
          <div className="job-listings-container row">
            {jobs.map((job) => {

              
              return (
               <div className="job-container col-12 col-sm-6 col-lg-4 p-1">
                <div className="job-div d-flex flex-column p-5" key={job.id}>
                  <div className="job-time-and-location-div-container d-flex justify-content-between">
                    <div className="job-time-and-location-div w-auto">Full Time</div>
                    <div className="job-time-and-location-div w-auto">
                      {job.location}
                    </div>
                  </div>
                  <div className="logo-and-title-container">
                    <img className="logo-div" src={job.profile_image}></img>
                    <div className="home-page-listing-title text-truncate " style={{maxWidth:"18rem"}}>{job.title}</div>
                  </div>
                  <div className="home-page-job-details-div">
                    <p>{job.category}</p><div style={{width:"1px",height:"1rem",background:"grey", marginTop:"-12px"}} ></div>
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
                </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
export default HomePage;

