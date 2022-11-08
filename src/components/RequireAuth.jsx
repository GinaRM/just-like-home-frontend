import React, { useContext} from "react";
import { UserContext} from "./UserContext"
import {useLocation, Navigate, Outlet} from "react-router-dom"



const PrivateRoute =()=>{
    const {userData} = useContext(UserContext)
    const location = useLocation();

    return (
        userData.token ?
        <Outlet />
        :
        <Navigate to="/signIn" state={{from: location}} replace/>

    )
}

export default PrivateRoute;

/*
EN APP
1 - importamos PrivateRoute
2- envolvemos las rutas que sean privadas con 

<Route element={<PrivateRoute />}>
    rutas que queremos privadas
</Route>

*/

