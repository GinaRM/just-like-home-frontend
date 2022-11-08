import React, { useContext, useState } from "react";
import header from "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import logo from "../../asserts/3.png";
import Sidebar from "../SideBar/Sidebar.jsx";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import { FilterContext } from "../../components/FilterContext";

const Header = () => {
  const { userData, setUserData } = useContext(UserContext);

  const { handleFilterData } = useContext(FilterContext);

  const navigate = useNavigate();

  const location = useLocation();

  const refreshPage = () => {
    window.location.reload();
  };

  const logOut = () => {
    localStorage.removeItem("jwt");
    const userDataOut = {
      name: null,
      lastName: null,
      email: null,
      isLogged: false,
      token: null,
      role: null,
    };

    setUserData(userDataOut);
    navigate("/");
    refreshPage();
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


  return (
    <header>
      <div className="header-boxes">
        <Link
          to="/"
          onClick={(e) =>
            handleFilterData({
              cityCode: null,
              category: null,
              rangeOfDates: {
                checkIn: null,
                checkOut: null,
              },
            })
          }
        >
          <div className="logotype">
            <div className="logo">
              <img
                src="https://justlikehome-images.s3.us-east-2.amazonaws.com/util/logo+fondo+blanco+header.png"
                alt="logo Just Like"
              />
            </div>
          </div>
        </Link>

        {userData.isLogged ? (
          <div className="user-info">
            
            {userData.role === "ADMIN" && <div className="administration">
                        <Link to="/administration"><h3>Administracion</h3></Link>
                  </div>
            }
            {userData.role !== null && <div className="reservations administration">
                        <Link to="/myreservations"><h3>Mis reservas</h3></Link>
                  </div>
            }

            <div className="user-name">
              <div className="user-avatar">
                <p>{firstLetter()}</p>
              </div>

              <div className="user-log-name">
                <p>Hola,</p>
                <p className="name">{userData.name}</p>
              </div>
              <Link to="/" className="logOut" onClick={logOut}>
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
              </Link>
            </div>
          </div>
        ) : (
          <div className="user-login">
            <div className="login-buttons">
              {!(location.pathname === "/signUp") && (
                <div className="button-6 buttonSignUp">
                  <Link to="/signUp">Crear Cuenta</Link>
                </div>
              )}

              {!(location.pathname === "/signIn") && (
                <div className="button-6 buttonSignIn">
                  <Link to="/signIn">Iniciar sesión</Link>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="menu">
          <Sidebar />
        </div>
      </div>
    </header>
  );
};

export default Header;
