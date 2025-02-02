import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import Header from '../../components/Header/header'




function LoginPage() {
  
    const [formData, setFormData] = useState({
      email:'',
      password:'',
  }); 

  const navigate=useNavigate();
  const token = localStorage.getItem('token');

  const handleChange = (e) => {
      const {name , value}= e.target;
      setFormData({
          ...formData,
          [name] : value
      });
  };

  const handleSubmit = (e)=>{
      e.preventDefault();
      const data = {
          email: formData.email,
          password: formData.password
      };
  
      // Send the form data to the backend
      fetch('http://192.168.100.3/api/login.php', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: formData.email,
            password: formData.password,
        }),    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        if(data.token){
            localStorage.setItem('token', data.token); 
           console.log(data);
          navigate("./profile")
        }
    })
    .catch((error) => {
        console.error('Error during login:', error);
    });
    
  
  };

  return(
      <div className="d-flex flex-column align-items-center justify-content-center">
         <Header></Header>
          <div className="d-flex flex-column col-10 col-sm-5 col-lg-3 align-items-center justify-content-center m-5 rounded-1" style={{height:"30rem", backgroundColor:"#974ec3"}}>
          <h2 style={{color:"#504099"}}>Login</h2>
          <form className="d-flex col-10 flex-column gap-3" onSubmit={handleSubmit}>

              <div className="group d-flex flex-column gap-1 text-white">
                  <label htmlFor="email">Email:</label>
                  <input type="email"
                  id="email"
                  name="email"
                  className="rounded border"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter Email"/>
              </div>

              <div className="group d-flex flex-column gap-1 text-white">
                  <label htmlFor="password">Password:</label>
                  <input type="password"
                  id="password"
                  name="password"
                  className="rounded border-0"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter password"/>
              </div>
          <button type="submit" className="submitBtn text-white border-0 rounded" style={{height:"30px",backgroundColor:"#504099"}}>Submit</button>
          </form>
          <span className="text-white">Doesn't have an account? <a className="text-white" href="./register">Create one now!</a></span>
          </div>
      </div>
  );
}

export default LoginPage;
