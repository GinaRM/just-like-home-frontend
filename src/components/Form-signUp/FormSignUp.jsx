import React, { useState, useEffect, useContext } from "react";
import formSignUp from "./formSignUp.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext.jsx";
import axios from "axios";
import Url from "../../util/Url";

const FormSignUp = () => {
  const { setUserData } = useContext(UserContext);

  const initialValues = {
    name: "",
    lastName: "",
    email: "",
    password: "",
    repPassword: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const [statusError, setStatusError] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormErrors(validInput(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      const userData = {
        name: formValues.name,
        lastName: formValues.lastName,
        email: formValues.email,
        password: formValues.password,
      };

      const postUserData = async () => {
        try {
          const url = Url() + "/api/authentication/sign-up";
          const response = await axios.post(url, userData);

          if (response.status === 201) {
         /*    const userDataLog = {
              name: userData.name,
              lastName: userData.lastName,
              email: userData.email,
              isLogged: true,
              token: userData.token,
            }; */

            navigate("/signIn");
          }
        } catch (error) {
          console.log(error);
          setStatusError(true);
        }
      };
      postUserData();
    }
  }, [formErrors]);

  const validInput = (values) => {
    const errors = {};
    const regex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

    if (!values.name) {
      errors.name = "El nombre es obligatorio";
    } else if (values.name.length < 3) {
      errors.name = "El nombre tiene que tener más de 3 caracteres";
    }

    if (!values.lastName) {
      errors.lastName = "El apellido es obligatorio";
    } else if (values.lastName.length < 3) {
      errors.name = "El apellido tiene que tener más de 3 caracteres";
    }

    if (!values.email) {
      errors.email = "El email es obligatorio";
    } else if (!regex.test(values.email)) {
      errors.email = "El email tiene que incluir un arroba (@) y .com";
    }

    if (!values.password) {
      errors.password = "La contraseña es obligatoria";
    } else if (values.password.length >= 15 || values.password.length < 6) {
      errors.password = "La contraseña tiene que tener entre 6 a 15 caracteres";
    }

    if (!values.repPassword) {
      errors.repPassword = "La contraseña es obligatoria";
    } else if (values.repPassword !== values.password) {
      errors.repPassword = "Las contraseñas tiene que coincidir";
    }

    return errors;
  };

  return (
    <div className="main-signUp">
      <form className="formSignUp" onSubmit={handleSubmit}>
        <div className="form-header">
          <h2>Crear cuenta</h2>
        </div>
        <div className="form-labels">
          <div className="name-label">
            <label htmlform="name">Nombre: </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formValues.name}
              onChange={handleChange}
            />
            <p className="error">{formErrors.name}</p>
          </div>

          <div className="last-name-label">
            <label htmlform="lastName">Apellido:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formValues.lastName}
              onChange={handleChange}
            />
            <p className="error">{formErrors.lastName}</p>
          </div>

          <label className="email-label" htmlform="email">
            Correo electrónico:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
          />
          <p className="error">{formErrors.email}</p>

          <label className="password-label" htmlform="password">
            Contraseña:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
          />
          <p className="error">{formErrors.password}</p>

          <label className="password-rep-label" htmlform="repPassword">
            Repetir contraseña:
          </label>
          <input
            type="password"
            id="repPassword"
            name="repPassword"
            value={formValues.repPassword}
            onChange={handleChange}
          />
          <p className="error">{formErrors.repPassword}</p>
        </div>

        <p className="error">
          {statusError
            ? "Lamentablemente no ha podido registrarse. Por favor, intente más tarde"
            : " "}
        </p>

        <button type="submit" className="button-signup">
          Crear Cuenta
        </button>

        <div className="go-sign">
          <Link to="/signIn">
            ¿Ya tienes una cuenta? <span> Iniciar sesión</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default FormSignUp;
