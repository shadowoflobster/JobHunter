import React, { useState } from "react";
import "./registerPage.css";
import Header from "../../components/Header/header";
import { useNavigate } from "react-router-dom";
import {ToastContainer, toast} from 'react-toastify';

function RegisterPage() {
  const [registrationRole, setRegistrationRole] = useState("User");
  const [isCompany, setIsCompany] = useState(false);
  const [error, setError] = useState([])
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: formData.name,
      surname: formData.surname,
      email: formData.email,
      password: formData.password,
    };

    fetch(`${process.env.REACT_APP_API_URL}/backend/api/register${registrationRole}.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          return Promise.reject("Server error");
        }
        return response.json(); // Parse the JSON response
      })
      .then((data) => {
        console.log("Success:", data);
        if(data.status=='success'){
          toast.success("Registered Successfuly",{
            autoClose:3000,
          });
          navigate('/');
        }else{
          toast.error("Registration Error",{
            autoClose:3000,
          });
        }      })
      .catch((error) => {
        console.error("Error:", error);
      });
      
  };
  
  const changeRegistrationRole = (e, role) => {
    setRegistrationRole(role);
    if (role === "Company") {
      setIsCompany(true);
    } else {
      setIsCompany(false);
    }
  };
 

  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <Header></Header>
      <div
        className="d-flex flex-column col-10 col-sm-5 col-lg-3 align-items-center  m-5 rounded-1"
        style={{ height: "35rem", backgroundColor: "#974ec3" }}
      >
        <h2 style={{ color: "#504099", margin: "2rem" }}>
          {isCompany ? <>Register as company</> : <>Register</>}
        </h2>
        <div className="col-10 d-flex" style={{ backgroundColor: "#974ec3" }}>
          <div
            className="col-6 text-center text-white"
            style={{ cursor: "pointer", borderRight: "1px solid #313866", borderBottom: isCompany ? "2px solid #313866" : "none"}}
            onClick={(e) => changeRegistrationRole(e, "User")}
          >
            As user
          </div>
          <div
            className="col-6 text-center text-white"
            style={{ cursor: "pointer", borderBottom: isCompany ? "none" : "2px solid #313866" }}
            onClick={(e) => changeRegistrationRole(e, "Company")}
          >
            As company
          </div>
        </div>
        <form
          className="d-flex col-10 flex-column gap-3"
          onSubmit={handleSubmit}
        >
          <div className="group d-flex flex-column gap-1 text-white">
            <label htmlFor="name">
              {isCompany ? <>Company name</> : <>Name</>}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter name"
            />
          </div>
          {isCompany ? null : (
            <div className="group d-flex flex-column gap-1 text-white">
              <label htmlFor="name">Surname:</label>
              <input
                type="text"
                id="surname"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                required
                placeholder="Enter Surname"
              />
            </div>
          )}
          <div className="group d-flex flex-column gap-1 text-white">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter Email"
            />
          </div>

          <div className="group d-flex flex-column gap-1 text-white">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter password"
            />
          </div>
          <button
            type="submit"
            className="submitBtn text-white border-0 rounded"
            style={{ height: "30px", backgroundColor: "#504099" }}
          >
            Register
          </button>
        </form>
        <span className="text-white">
          Already have an account?{" "}
          <a className="text-white" href="./">
            Sign in now!
          </a>
        </span>
      </div>
    </div>
  );
}
export default RegisterPage;
