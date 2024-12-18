import React from "react";
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from "./pages/LoginPage/loginPage";
import RegisterPage from "./pages/RegisterPage/registerPage";
import RegisterPageCompany from "./pages/RegisterPageCompany/registerPageCompany";
import Profile from "./pages/profile/profile";
import ProfileCompany from "./pages/ProfileCompany/profileCompany";
import UploadJob from "./pages/UploadJob/uploadJob";
import JobListings from "./pages/JobListings/jobListings";
import HomePage from "./pages/HomePage/HomePage";

function App() {

  return (
      <div className="App">
        <Routes>
          <Route path="/home-page" element={<HomePage/>}/>
          <Route path="/" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/register-company" element={<RegisterPageCompany/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/profile-company" element={<ProfileCompany/>}/>
          <Route path="/upload-job" element={<UploadJob/>}/>
          <Route path="/job-listings" element={<JobListings/>}/>
        </Routes>
      </div>
  );
}

export default App;
