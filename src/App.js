import React from "react";
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from "./pages/LoginPage/loginPage";
import RegisterPage from "./pages/RegisterPage/registerPage";
import Profile from "./pages/profile/profile";
import UploadJob from "./pages/UploadJob/uploadJob";
import JobListings from "./pages/JobListings/jobListings";
import JobPage from "./pages/JobPage/JobPage"
import HomePage from "./pages/HomePage/HomePage";
import CategoriesPage from "./pages/CategoriesPage/categoriesPage";
import Footer from "./components/Footer/footer";
import {ToastContainer} from 'react-toastify';

function App() {

  return (
      <div className="App">
        <Routes>
          <Route path="/home-page" element={<HomePage/>}/>
          <Route path="/" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/job-page" element={<JobPage/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/upload-job" element={<UploadJob/>}/>
          <Route path="/job-listings" element={<JobListings/>}/>
          <Route path="/categories-page" element={<CategoriesPage/>}/>
        </Routes>
        <ToastContainer/>
        <Footer></Footer>
      </div>
  );
}

export default App;
