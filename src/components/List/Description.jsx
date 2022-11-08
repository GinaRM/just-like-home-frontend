import React from "react";

/* let locationReservation = window.location.pathname;
let locationAPI = locationReservation.split("/"); */

function AcortarDescripcion({ item }) {
  let string = item.description;
  let arrayString = string.split(" ");
  let trimmedString = [];
  let descripcion = arrayString[0];
  for (let i = 1; i < 13; i++) {
    descripcion = descripcion + " " + arrayString[i];
  }
  descripcion = descripcion + "...";

  return <p className="card-description">{descripcion}</p>;
}

export default AcortarDescripcion;
