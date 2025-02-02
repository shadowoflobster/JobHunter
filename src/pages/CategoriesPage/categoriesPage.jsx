import React, { useState, useEffect } from "react";
import Header from "../../components/Header/header"
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import './categoriesPage.css';
function CategoriesPage (){
    const [authorization, setAuthorization] = useState(false);
    const [role, setRole] = useState();
   
    const token=localStorage.getItem("token")
    const navigate=useNavigate();

   
    useEffect(() =>{
    if(token){
        const decoded = jwtDecode(token);
        if (token) {
              setAuthorization(true);
              const decoded = jwtDecode(token);
              setRole(decoded.user_role);
            }
    }

}, [token])


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

  const navigateToJobListings=(categoryFilter)=>{
    navigate('/job-listings',{
        state: {categoryFilter},
    });
  }

return(
        <div className="d-flex flex-column align-items-center gap-2">
    <Header role={role} authorizationStatus={authorization}></Header>
    <div className="col-8 row g-2 align-items-center justify-content-center">
    {Object.entries(categoriesWithIcons).map(([category, icon], index) => (
      <div key={index} className="category m-1 col-12 col-sm-5 col-lg-3 d-flex flex-column justify-content-center align-items-center text-center rounded" 
      style={{border:"1px solid grey", cursor:"pointer",color:"white", height:"4.25rem", backgroundColor:"#974ec3"}}
      onClick={()=>navigateToJobListings(category)}>
        <i className={`bi ${icon}`}></i> {category}
      </div>
    ))}
        
    </div> 
  </div>
)
}

export default CategoriesPage;