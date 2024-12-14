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
      fetch('http://localhost/api/login.php', {
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
            if(data.role=='user'){
              navigate("./profile")
            }else if(data.role=='company'){
                navigate("./profile-company")
            }
        }
    })
    .catch((error) => {
        console.error('Error during login:', error);
    });
    
  
  };

  return(
      <div className="register-page">
         <Header></Header>
          <div className="register-div">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>

              <div className="group">
                  <label htmlFor="email">Email:</label>
                  <input type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter Email"/>
              </div>

              <div className="group">
                  <label htmlFor="password">Password:</label>
                  <input type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter password"/>
              </div>
          <button type="submit" className="submitBtn">Submit</button>
          </form>
          </div>
      </div>
  );
}

export default LoginPage;
