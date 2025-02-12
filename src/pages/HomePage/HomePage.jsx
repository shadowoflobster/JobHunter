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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthorization(true);
      const decoded = jwtDecode(token);
      setRole(decoded.user_role);
    }
    fetch(`${process.env.REACT_APP_API_URL}/backend/api/featuredJobs.php`)
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

  const handleNavigateToJob = (id) => {
    navigate("/job-page", {
      state: { jobId: id },
    });
  };

  return (
    <div className="home-page-div gap-2 d-flex flex-column justify-content-center align-items-center">
      <Header role={role} authorizationStatus={authorization}></Header>
      {/*Content 1*/}
      <div className="home-page-content-1 col-12 d-flex flex-column justify-content-center align-items-center">
        <h1 className="home-page-header col-8 text-center  ">
          Bringing You Closer to Your Career Goals.
        </h1>
        <p className="text-center  ">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, eiusmod sed
          do eiusmod
        </p>
        <div
          className="home-page-search-div row align-items-center col-11 col-md-8 col-lg-6 bg-white rounded-5"
          style={{ height: "3.5rem" }}
        >
          <img
            className="home-page-search-icon col-1"
            src={searchIcon}
            alt=""
          />
          <input
            className="home-page-search-input col-8 col-xl-9 border-0"
            placeholder="Job Title, keywords......"
            style={{ outline: "none" }}
          ></input>
          <button className="home-page-search-button col-3 col-xl-2 text-center h-100 border-0 bg-black rounded-5 text-white fs-4 cursor-pointer">
            Search
          </button>
        </div>
      </div>
      {/*Featured jobs*/}

      <div className="home-page-featured-jobs-div col-11">
        <div className="home-page-featured-jobs-head-div d-flex justify-content-between align-items-center">
          <h1 className="home-page-featured-jobs-header d-sm-flex d-none">Our Featured Jobs</h1>
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
        <div className="container w-100">
          {/*Job listings*/}
          <div className="row g-5 g-xl-0 justify-content-center">
            {jobs.map((job) => {
              return (
                <div className="col-10 col-sm-4 col-xl-2 d-flex p-2 ">
                  <div
                    className="col-12 d-flex flex-column p-3 gap-3 rounded secondary-color pb-2 "
                    style={{cursor:"pointer"}}
                    key={job.id}
                    onClick={()=>handleNavigateToJob(job.id)}
                  >
                    <div className="col-12 rounde d-flex align-items-center justify-content-center" style={{height:"150px"}}>
                      <i className={categoriesWithIcons[job.category]} style={{fontSize:"6em", color:"white"}}></i>
                      </div>
                    <div><p className="m-0 p-0 text-white" style={{fontSize:"0.6em"}}>{job.category}</p>
                    <div className="text-white " style={{fontSize:"1em", height:"2rem", maxHeight:"2rem"}}>{truncateText(job.title,35)}</div>
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
                    <div className="col-12 d-flex align-items-center pt-2 gap-1 mt-1" style={{borderTop:"1.5px solid #2c3c57"}}>
                      <img className="job-listing-company-image" src={job.profile_image}/>
                      <p className="m-0 p-0 text-white" style={{fontSize:"0.7em"}}>{job.company_name}</p>
                    </div>
                  </div>
                </div>

                //  <div className="job-container col-12 col-sm-6 col-lg-4 p-1">
                //   <div className="job-div d-flex flex-column p-5" key={job.id}>
                //     <div className="job-time-and-location-div-container d-flex justify-content-between">
                //       <div className="job-time-and-location-div w-auto">Full Time</div>
                //       <div className="job-time-and-location-div w-auto">
                //         {job.location}
                //       </div>
                //     </div>
                //     <div className="logo-and-title-container">
                //       <img className="logo-div" src={job.profile_image}></img>
                //       <div className="home-page-listing-title text-truncate " style={{maxWidth:"18rem"}}>{job.title}</div>
                //     </div>
                //     <div className="home-page-job-details-div">
                //       <p>{job.category}</p><div style={{width:"1px",height:"1rem",background:"grey", marginTop:"-12px"}} ></div>
                //       {(job.salary) ? (<p>${job.salary}</p>) :

                //       (job.minSalary && job.maxSalary) ? (<p>${job.minSalary}-{job.maxSalary}</p>) :
                //       (job.minSalary) ? (<p>${job.minSalary}-?</p>) : (<p>$?-{job.maxSalary}</p>)
                //       }

                //       <p>/Monthly</p>
                //     </div>
                //     {(role=='company') ? (
                //       <p>You can't apply for job as a company but you are free to check out details</p>
                //     ) : (
                //     <button className="home-page-job-listing-button col-12" onClick={()=>handleNavigateToJob(job.id)}>
                //       Apply Now
                //     </button>
                //     )}
                //   </div>
                //   </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
export default HomePage;
