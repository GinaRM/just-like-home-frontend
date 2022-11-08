import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider =({children})=>{

    const [userData, setUserData] = useState({
        name: null,
        lastName: null,
        email: null,
        isLogged: false,
        token: null,
        role: null
    });
 
    return (
        <UserContext.Provider value ={{userData,setUserData}}>
            {children}
        </UserContext.Provider>
    )
}
