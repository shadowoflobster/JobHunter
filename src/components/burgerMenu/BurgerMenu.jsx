import React,{useState} from "react";
import './BurgerMenu.css';

const BurgerMenu=({authorizationStatus})=>{
    const [isOpen,setIsOpen] = useState(false);
    
    
    return(
        <div className="burger-menu d-flex d-sm-none flex-column mt-5 gap-2 align-items-center justify-content-center p-1" style={{height:"fit-content",zIndex:"999"}}>
            <a className="text-white text-decoration-none text-center" href="/home-page">Home</a>
            <a className="text-white text-decoration-none text-center"href="/job-listings">Jobs</a>
            <a className="text-white text-decoration-none text-center"href="/categories-page">Categories</a>
            <a className="text-white text-decoration-none text-center"href="/about">About</a>
            <a className="text-white text-decoration-none text-center"href="/contact">Contact</a>                    
                    {authorizationStatus ? (
                        console.log(authorizationStatus)
                    ) : (
                    <div className="d-flex flex-column w-100">
                        <a className="w-100 text-decoration-none text-center text-black bg-white"href="/contact">Login</a>
                        <a className="text-black bg-white text-decoration-none text-center"href="/contact">Create an account</a>
                    </div>
                    )}
        </div>
    )
}

export default BurgerMenu;