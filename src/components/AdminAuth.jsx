import React, { useContext} from "react";
import { UserContext} from "./UserContext"
import {useLocation, Navigate, Outlet} from "react-router-dom"



const AdminRoute =()=>{
    const {userData} = useContext(UserContext)
    const location = useLocation();

    return (
        userData.role === "ADMIN" ?
        <Outlet />
        :
        <Navigate to="/" state={{from: location}} replace/>

    )
}

export default AdminRoute;