import React,{useState} from "react";
import './BurgerMenu.css';

const BurgerMenu=()=>{
    const [isOpen,setIsOpen] = useState(false);
    const handleBurgerOpen=()=>{

    }
    
    return(
        <div className="burger-menu d-flex d-sm-none flex-column mt-5 gap-2 align-items-center justify-content-center" style={{height:"12rem",zIndex:"999"}}>
            <a className="text-white text-decoration-none text-center" href="/home-page">Home</a>
            <a className="text-white text-decoration-none text-center"href="/job-listings">Jobs</a>
            <a className="text-white text-decoration-none text-center"href="/categories-page">Categories</a>
            <a className="text-white text-decoration-none text-center"href="/about">About</a>
            <a className="text-white text-decoration-none text-center"href="/contact">Contact</a>
        </div>
    )
}

export default BurgerMenu;