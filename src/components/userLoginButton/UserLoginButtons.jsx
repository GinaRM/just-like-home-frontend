import React from "react";


const UserLoginButtons = () =>{
    return(
        <div className="login-buttons">
            <div className="button-6">
                <Link to="/signUp" >Crear Cuenta</Link>
            </div>
            
            <div className="button-6">
                <Link to="/signIn" >Iniciar sesión</Link>
            </div>
        </div>
    )
}

export default UserLoginButtons
