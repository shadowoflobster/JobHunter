import React, {useState} from "react";
import Header from '../../components/Header/header'


function RegisterPageCompany(){
    const [formData, setFormData] = useState({
        name:'',
        email:'',
        password:'',
    }); 
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
            name: formData.name,
            email: formData.email,
            password: formData.password
        };
    
        // Send the form data to the backend
        fetch('http://192.168.100.7/api/registerCompany.php', {
            method: 'POST', // Ensure this is POST
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), // Send form data as JSON
        })
        .then(response => {
            if (!response.ok) {
                return Promise.reject('Server error');
            }
            return response.json(); // Parse the JSON response
        })
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    
    };

    return(
        <div className="register-page">
            <Header></Header>
            <div className="register-div">
            <h2>Register as company</h2>
            <form onSubmit={handleSubmit}>
                <div className="group">
                    <label htmlFor="name">Company Name:</label>
                    <input type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter name"/>
                </div>
                <div className="group">
                    <label htmlFor="email">Company Email:</label>
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
    )
}
export default RegisterPageCompany;