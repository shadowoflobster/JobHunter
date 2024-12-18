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
      console.log(role);
    }
    fetch("http://localhost/api/featuredJobs.php")
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

  return (
    <div className="home-page-div">
      <Header></Header>
      {/*Content 1*/}
      <div className="home-page-content-1">
        <h1 className="home-page-header">
          Bringing You Closer to Your Career Goals.
        </h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, eiusmod sed
          do eiusmod
        </p>
        <div className="home-page-search-div">
          <img className="home-page-search-icon" src={searchIcon} alt="" />
          <input
            className="home-page-search-input"
            placeholder="Job Title, keywords......"
          ></input>
          <button className="home-page-search-button">Search</button>
        </div>
      </div>
      {/*Featured jobs*/}

      <div className="home-page-featured-jobs-div">
        <div className="home-page-featured-jobs-head-div">
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
          <div className="job-listings-container">
            {jobs.map((job) => {
              let requirements = [];

              if (typeof job.requirements === "string") {
                try {
                  requirements = JSON.parse(job.requirements);
                } catch {
                  requirements = job.requirements
                    .split(",")
                    .map((req) => req.trim());
                }
              } else if (Array.isArray(job.requirements)) {
                requirements = job.requirements;
              }
              return (
                <div className="job-div" key={job.id}>
                  <div className="job-time-and-location-div-container">
                    <div className="job-time-and-location-div">Full Time</div>
                    <div className="job-time-and-location-div">
                      {job.location}
                    </div>
                  </div>
                  <div className="logo-and-title-container">
                    <div className="logo-div"></div>
                    <div className="listing-title">{job.title}</div>
                  </div>
                  <div className="home-page-job-details-div">
                    <p>{job.job_type}</p>|
                    {(job.salary) ? (<p>${job.salary}</p>) :

                    (job.minSalary && job.maxSalary) ? (<p>${job.minSalary}-{job.maxSalary}</p>) :
                    (job.minSalary) ? (<p>${job.minSalary}-?</p>) : (<p>$?-{job.maxSalary}</p>) 
                    }
                    
                    <p>/Monthly</p>
                  </div>
                  <button className="home-page-job-listing-button">
                    Apply Now
                  </button>
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

