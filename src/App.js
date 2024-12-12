import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
import RegisterPageCompany from "./pages/registerPageCompany";
import Profile from "./pages/profile";
import ProfileCompany from "./pages/profileCompany";
import UploadJob from "./pages/uploadJob";

function App() {

  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/register-company" element={<RegisterPageCompany/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/profile-company" element={<ProfileCompany/>}/>
          <Route path="/upload-job" element={<UploadJob/>}/>
        </Routes>
      </div>
  );
}

export default App;
