import React, { useState } from "react";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import calendar from "./calendar.css";
import defaultLocale from "date-fns/locale/es";
import useWindowDimensions from "../../hooks/useWindowDimensions.jsx";
import { Link } from "react-router-dom";

const CalendarReservation = ({ id, disabledD }) => {
  let location = window.location.pathname;
  let locationPath = location.split("/");
  let locationId = locationPath[2];
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  //disabledDates={disabledDates}

  const windowDimension = useWindowDimensions();
  let url = localStorage.getItem("url");
  const setReservation = () => {
    if(url == null || url !== locationId){
      localStorage.setItem("url", locationId);
    }
  }

  return (
    <div className="reservationBlock">
      <div className="calendarBlock">
        <h2>Fechas disponibles</h2>

        {windowDimension.width < 768 ? (
          <Calendar
            direction="horizontal"
            showPreview={false}
            locale={defaultLocale}
            minDate={new Date()}
            months={1}
            disabledDates={disabledD}
          />
        ) : (
          <Calendar
            direction="horizontal"
            showPreview={false}
            locale={defaultLocale}
            minDate={new Date()}
            months={2}
            disabledDates={disabledD}
          />
        )}
      </div>
      <div className="reservation-container reservation-container-product">
        <div className="reservation">
          <h3>Agregá tus fechas de viaje para obtener precios exactos</h3>
          {/* <button className="button-c">Iniciar reserva</button> */}
          <Link className="button-c" to={`/product/reservation/${id}`} onClick={url == null ? setReservation : setReservation}>
            Iniciar reserva
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CalendarReservation;
