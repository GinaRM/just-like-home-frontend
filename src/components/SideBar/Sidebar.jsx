import React, { useState, useContext } from "react";
import sideBar from "./sideBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faBars } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faLinkedinIn,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext.jsx";
import { useNavigate, useLocation } from "react-router-dom";

function Sidebar() {
  const [showSideBar, setShowSideBar] = useState(false);
  const { userData, setUserData } = useContext(UserContext);

  const navigate = useNavigate();

  const location = useLocation();

  const logOut = () => {
    const userDataOut = {
      name: null,
      lastName: null,
      email: null,
      isLogged: false,
      token: null,
    };

    setUserData(userDataOut);
    localStorage.removeItem("jwt");
    navigate("/");
  };

  const firstLetter = () => {
    
    /*
   let name = userData.name
   let lastName = userData.lastName
   
   let separatedNames = name.split(" ")
   let separatedLastNames = lastName.split(" ")

   //TOMAR SOLO EL PRIMER NOMBRE Y HASTA DOS APELLIDOS

   */

   let completeName = `${userData.name} ${userData.lastName}`;
   let separetedCompleteName = completeName.split(" ");


   let nameWithoutEmptySpace = separetedCompleteName.filter((name) => name !=="");


   
   let inicials = [];
   
   nameWithoutEmptySpace.map((word) => {
     inicials.push(word[0].toUpperCase());
   });

   let letters = inicials.join("");

   return letters;
 
 };

  if (showSideBar) {
    return (
      <div className="side-bar">
        <div className="side-bar-out">
          <div className="side-bar-out-elements">
            <FontAwesomeIcon icon={faX} onClick={() => setShowSideBar(false)} />

            {userData.isLogged ? (
              <div className="user-info-bar">
                <div className="user-avatar-bar">
                  <h2>{firstLetter()}</h2>
                </div>

                <p>Hola,</p>
                <p className="name-bar">{userData.name}</p>
              </div>
            ) : (
              <h2>Menú</h2>
            )}
          </div>
        </div>

        <div className="side-bar-options">
          {userData.isLogged ? (

            <div className="option-container">
                                            
              <div>
                <ul className="options">
                  {userData.role === "ADMIN" && 
        
                  
                  <li className="administration-bar">
                    <Link to="/administration" onClick={()=>setShowSideBar(false)} ><h3>Administracion</h3></Link>
                  </li>
                  }


                  {userData.role !== null && 
                    <li className="reservations administration">
                      <Link to="/myreservations" onClick={() => setShowSideBar(false)}><h3>Mis reservas</h3></Link>
                    </li>
                  }

                </ul>
              </div>

              <div>
                <ul className="options">
                  <li className="logOut">
                    <Link to="/" onClick={logOut}><h3>¿Deseas <span>cerrar sesión?</span></h3></Link>
                  </li>
                </ul>
              </div>

            </div>
          ) : (
            <ul className="options">
              <li>
                <Link to="/" onClick={() => setShowSideBar(false)}>
                  <h3>Home</h3>
                </Link>
              </li>

              <li>
                <Link to="/signUp" onClick={() => setShowSideBar(false)}>
                  <h3>Crear cuenta</h3>
                </Link>
              </li>
              <li>
                <Link to="/signIn" onClick={() => setShowSideBar(false)}>
                  <h3>Iniciar sesión</h3>
                </Link>
              </li>
            </ul>
          )}
        </div>

        <div className="side-bar-social-media">
          <ul>
            <li>
              <FontAwesomeIcon icon={faFacebook} />
            </li>
            <li>
              <FontAwesomeIcon icon={faLinkedinIn} />
            </li>
            <li>
              <FontAwesomeIcon icon={faTwitter} />
            </li>
            <li>
              <FontAwesomeIcon icon={faInstagram} />
            </li>
          </ul>
        </div>
      </div>
    );
  }
  return (
    <FontAwesomeIcon
      icon={faBars}
      onClick={() => {
        setShowSideBar(true);
      }}
    />
  );
}

export default Sidebar;
