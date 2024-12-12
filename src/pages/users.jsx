import React, {useState, useEffect} from "react";


function Users (){
    const [users, setUsers] = useState({
        name:"",
        email:"",
        password:"",
    })
    useEffect(()=>{
        let isMounted = true;
        const controller=new AbortController();

        const getUsers = async () =>{
            
        }

    })


}

export default Users;