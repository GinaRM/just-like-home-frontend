import React, { useState, useEffect, useContext } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import defaultLocale from "date-fns/locale/es";
import useWindowDimensions from "../../hooks/useWindowDimensions.jsx";

import axios from "axios";
import Url from "../../util/Url";
import { PoliciesRender2 } from "../Products/Product";
import jwt_decode from "jwt-decode";
import "./reservation.css";
import ProductHeader from "../Products/ProductHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleUp,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faArrowCircleDown } from "@fortawesome/free-solid-svg-icons";
import { ImagesRender } from "../List/List";
import moment from "moment";
import { ReservationContext } from "../ReservationContext";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
/* import {
  Dropdown,
  DropdownItem as option,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap"; */
import { useNavigate } from "react-router-dom";

import { UserContext } from "../UserContext.jsx";

const Reservation = () => {
  let locationReservation = window.location.pathname;
  let locationAPI = locationReservation.split("/");
  let location = locationAPI[3];
  const { userData, setUserData } = useContext(UserContext);
  const [reservationError, setReservationError] = useState(false);
  const [isActive, setActive] = useState(false);
  const [errorCity, setErrorCity] = useState(false);
  const [errorTime, setErrorTime] = useState(false);
  const [errorDate, setErrorDate] = useState(false);

  // RANGO DE FECHAS DEL CALENDARIO
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),

      key: "selection",
    },
  ]);

  const startDate = state[0].startDate;
  const endDate = state[0].endDate;

  const year = startDate.getFullYear();
  const month = startDate.getMonth();
  const day = startDate.getDate();

  const yearE = endDate.getFullYear();
  const monthE = endDate.getMonth();
  const dayE = endDate.getDate();

  function sendedDateFomatter(date) {
    const d = moment(date);
    return d.format("YYYY-MM-DD");
  }

  // DESHABILITA LAS FECHAS RESERVADAS EN EL CALENDARIO

  const { reservationsDates } = useContext(ReservationContext);

  const getRange = (startDate, endDate, type = "days") => {
    let fromDate = moment(startDate);
    let toDate = moment(endDate);
    let diff = toDate.diff(fromDate, type);
    let range = [];
    for (let i = 0; i <= diff; i++) {
      range.push(moment(startDate).add(i, type)._d);
    }
    return range;
  };

  const disabledDates = [];

  let allDays = [];
  reservationsDates.map((rd) => {
    allDays = [...allDays, ...getRange(rd.checkIn, rd.checkOut)];
  });

  const days = allDays;

  days.map((d) => {
    const year = d.getFullYear();
    const month = d.getMonth();
    const day = d.getDate();

    disabledDates.push(new Date(year, month, day));
  });

  const windowDimension = useWindowDimensions();

  const [reservationInfo, setReservationInfo] = useState();

  function Fetch() {
    let url = Url() + "/api/product/" + location;
    useEffect(() => {
      axios
        .get(url)
        .then((response) => setReservationInfo(response.data))
        .catch((error) => console.log(error));
    }, [url]);
  }
  Fetch();

  function GetCheckInHour({ product }) {
    let rules = product.policy.rules;
    rules = rules.replaceAll("am", "AM");
    rules = rules.replaceAll("pm", "PM");
    let arrayRules = rules.split(",");
    arrayRules = arrayRules[2];
    arrayRules = arrayRules.slice(10);
    arrayRules = arrayRules.split("-");

    if (arrayRules.length == 2) {
      return (
        <div className="checkIn-info">
          <FontAwesomeIcon icon={faCheckCircle} />
          <p className="checkIn-info-p">
            Tu habitación va a estar lista para el check-in entre las{" "}
            {arrayRules[0]} y las {arrayRules[1]}
          </p>
        </div>
      );
    } else {
      return (
        <div className="checkIn-info">
          <FontAwesomeIcon icon={faCheckCircle} />
          <p className="checkIn-info-p">
            Tu habitación va a estar lista para el check-in durante todo el día.
          </p>
        </div>
      );
    }
  }

  const [Dropdown, setDropdown] = useState(false);
  const abrirCerrarDropdown = () => setDropdown(!Dropdown);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* --------------- POST ------------------- */

  const [checkInHour, setCheckInHour] = useState(null);
  let token = localStorage.getItem("jwt");
  let decode = jwt_decode(token);

  const navigate = useNavigate();
  let checkIn_hour;
  let data = {};
  function CreateReservationData() {
    data = {
      product: {
        id: reservationInfo.id,
      },
      checkIn: sendedDateFomatter(startDate),
      checkIn_hour: checkInHour,
      checkOut: sendedDateFomatter(endDate),
      user: {
        id: decode.userId,
      },
    };
  }

  const postProductReservationDays = async () => {
    CreateReservationData();
    try {
      const url = Url() + "/api/reservation";
      const result = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (result.request.status === 201) {
        navigate("/ConfirmationMessage");
      } else {
        setReservationError(true);
        setActive(true);
      }
    } catch (e) {
      setReservationError(true);
      setActive(true);
      console.log(e.message);
    }
  };

  const handleToggle = () => {
    setActive(!isActive);
  };

  function RenderErrorMessage() {
    if (isActive) {
      return (
        <div className="reservation-error">
          <FontAwesomeIcon
            icon={faCircleXmark}
            className="carousel-close"
            onClick={handleToggle}
          />
          <h2>Lamentablemente la reserva no ha podido realizarse</h2>
          <p>Por favor, intente más tarde</p>
          <button className="button-c button-error">Aceptar</button>
        </div>
      );
    }
  }

  const validData = async () => {

    let cityInput = document.getElementById("cityinput").value;
    checkInHour !== null ? setErrorTime(false) : setErrorTime(true);
    cityInput.length > 2 ? setErrorCity(false) : setErrorCity(true);
    sendedDateFomatter(endDate) !== sendedDateFomatter(startDate)? setErrorDate(false) : setErrorDate(true);

    console.log(errorCity);

    if (checkInHour !== null && cityInput.length > 2 && sendedDateFomatter(endDate) !== sendedDateFomatter(startDate)) {
      postProductReservationDays();
    }
  };

  return (
    <div className="main main-reservation">
      {reservationInfo && (
        <ProductHeader
          category={reservationInfo.category.title}
          title={reservationInfo.title}
          path={`/product/${reservationInfo.id}`}
        />
      )}
      <section className="main-sections">
        <section className="section-reservation">
          <h2 className="reservation-data-h2">Completá tus datos</h2>
          <div className="card reservation-container">
            <form className="reservation-form">
              <div className="form-labels-reservation">
                <div>
                  <label htmlFor="nombre">Nombre:</label>
                  <input
                    type="text"
                    name="text"
                    id="nameinput"
                    defaultValue={userData.name}
                  />
                </div>
                <div>
                  <label htmlFor="apellido">Apellido:</label>
                  <input
                    type="text"
                    name="text"
                    id="lastname"
                    defaultValue={userData.lastName}
                  />
                </div>
                <div>
                  <label htmlFor="email">Correo Electrónico:</label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    defaultValue={userData.email}
                  />
                </div>
                <div>
                  <label htmlFor="city" className="label-city">
                    Ciudad:
                    <p className={errorCity ? "error-city-p" : "hide"}>
                      Por favor indica tu ciudad
                    </p>
                  </label>
                  <input
                    type="text"
                    name="city"
                    id="cityinput"
                    className={errorCity ? "error-city" : "city-input"}
                  />
                </div>
              </div>
            </form>
          </div>
          <h2 className="reservation-dates-h2">Fechas disponibles</h2>
          <div className="reservationBlock block-reservation-page">
            <div className="calendarBlock reservation-calendar">
              {windowDimension.width < 768 ? (
                <div>
                  {" "}
                  <DateRange
                    className="calendar-mobile"
                    editableDateInputs={true}
                    onChange={(item) => setState([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={state}
                    locale={defaultLocale}
                    minDate={new Date()}
                    disabledDates={disabledDates}
                  />
                </div>
              ) : (
                <div>
                  <DateRange
                    className="calendar-tablet"
                    onChange={(item) => setState([item.selection])}
                    showSelectionPreview={true}
                    moveRangeOnFirstSelection={false}
                    months={2}
                    ranges={state}
                    direction="horizontal"
                    locale={defaultLocale}
                    minDate={new Date()}
                    disabledDates={disabledDates}
                  />
                </div>
              )}
            </div>
          </div>
          <h2 className="card-title reservation-times-h2">
            Tu horario de llegada{" "}
          </h2>
          <div className="card reservation-times-info">
            {reservationInfo && <GetCheckInHour product={reservationInfo} />}
            <div className="select-checkIn">
              <p>Indicá tu horario estimado de llegada</p>
              <p className={errorTime ? "error-time-p" : "hide"}>
                Por favor indica tu horario de llegada
              </p>
              <select
                name="check-in-hour"
                className={
                  errorTime
                    ? "search_cities select_checkin-hour error-time"
                    : "search_cities select_checkin-hour"
                }
                onChange={(e) =>
                  setCheckInHour((checkIn_hour = e.target.value))
                }
              >
                <option value="null">Seleccionar hora de llegada</option>
                <option value="00:00">00:00 AM</option>
                <option value="01:00"> 01:00 AM</option>
                <option value="02:00"> 02:00 AM</option>
                <option value="03:00"> 03:00 AM</option>
                <option value="04:00"> 04:00 AM </option>
                <option value="05:00"> 05:00 AM</option>
                <option value="06:00"> 06:00 AM</option>
                <option value="07:00"> 07:00 AM</option>
                <option value="08:00"> 08:00 AM</option>
                <option value="09:00"> 09:00 AM </option>
                <option value="10:00"> 10:00 AM</option>
                <option value="11:00"> 11:00 AM</option>
                <option value="12:00"> 12:00 PM</option>
                <option value="13:00"> 13:00 PM</option>
                <option value="14:00"> 14:00 PM </option>
                <option value="15:00"> 15:00 PM</option>
                <option value="16:00"> 16:00 PM</option>
                <option value="17:00"> 17:00 PM </option>
                <option value="18:00"> 18:00 PM</option>
                <option value="19:00"> 19:00 PM</option>
                <option value="20:00"> 20:00 PM </option>
                <option value="21:00"> 21:00 PM</option>
                <option value="22:00"> 22:00 PM</option>
                <option value="23:00"> 23:00 PM </option>
              </select>
            </div>
          </div>
        </section>
        <section className="product-details">
          <h2 className="card-title reservation-title-h2">
            Detalles de reserva
          </h2>

          {reservationInfo && (
            <div className="card reservation-product-info">
              <ImagesRender item={reservationInfo} />
              <div className="info-reservation-and-product">
                <div className="card-title" key={reservationInfo.id}>
                  <h2> {reservationInfo.title}</h2>
                  <p className="card-location">
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      className="location-icon"
                    />
                    {reservationInfo.city.name}, {reservationInfo.city.country}
                  </p>
                </div>
                <div className="dates">
                  <h3>
                    Check In: {day}/{month}/{year}
                  </h3>
                  <h3>
                    Check Out: {dayE}/{monthE}/{yearE}
                  </h3>
                </div>
              <div className="errors-reservation">
                <p className={errorTime ? "error-time-p" : "hide"}>
                Por favor indica tu horario de llegada
              </p>
                <p className={errorCity ? "error-city-p" : "hide"}>
                Por favor indica tu ciudad
              </p>
                <p className={errorDate ? "error-dates-p" : "hide"}>
                No se permite indicar la misma fecha de check in y check out
              </p>
              </div>
                <button
                  className="button-c"
                  /* onClick={postProductReservationDays} */
                  onClick={validData}
                >
                  Confirmar reserva
                </button>
              </div>
            </div>
          )}
        </section>
      </section>
      <div className="policies-container-reservation">
        {reservationInfo && <PoliciesRender2 product={reservationInfo} />}
      </div>
      <RenderErrorMessage />
    </div>
  );
};
export default Reservation;
