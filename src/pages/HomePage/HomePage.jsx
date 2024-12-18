import React from "react";
import Header from "../../components/Header/header";
import "./HomePage.css";
import searchIcon from "../../SVGs/searchIcon.svg";
import arrowIcon from "../../SVGs/viewAllArrow.svg";

function HomePage() {
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
          <button className="home-page-featured-jobs-header-button">
            View All <img src={arrowIcon}></img>
          </button>
        </div>
        {/*Home page listings*/}
        <div className="home-page-featured-jobs-list-div">
          {/*Job listings*/}
          <div className="job-listings-container">
            <div className="job-div">
              <div className="job-time-and-location-div-container">
                <div className="job-time-and-location-div">Full Time</div>
                <div className="job-time-and-location-div">Glendale, CA</div>
              </div>
              <div className="logo-and-title-container">
                <div className="logo-div"></div>
                <div className="listing-title">Product Manager</div>
              </div>
              <div className="home-page-job-details-div">
                <p>Marketing</p>
                |
                <p>$2,000-5,000</p>
                <p>/Monthly</p>
              </div>
              <button className="home-page-job-listing-button">Apply Now</button>
            </div>
            <div className="job-div">
              <div className="job-time-and-location-div-container">
                <div className="job-time-and-location-div">Full Time</div>
                <div className="job-time-and-location-div">Glendale, CA</div>
              </div>
            </div>
            <div className="job-div">
              <div className="job-time-and-location-div-container">
                <div className="job-time-and-location-div">Full Time</div>
                <div className="job-time-and-location-div">Glendale, CA</div>
              </div>
            </div>
            <div className="job-div">
              <div className="job-time-and-location-div-container">
                <div className="job-time-and-location-div">Full Time</div>
                <div className="job-time-and-location-div">Glendale, CA</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HomePage;


{/*<div className="home-page-blogs-container">
          <h1 className="home-page-featured-jobs-header">Our Blogs</h1>
          <div className="home-page-blogs-listing">
            <div className="home-page-blog-div"></div>
          </div>
          </div>*/}