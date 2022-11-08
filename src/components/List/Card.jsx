import React from "react";
import Listar from "./List";

function Cards() {
  return (
    <div className="container d-flex justify-content-left bg-info">
      <div className="row">
        <div className="col-md-3"></div>
      </div>
      <div className="row">
        <div className="col-md-3"></div>
      </div>
      <div className="row">
        <div className="col-md-3"></div>
      </div>
      <div className="row">
        <div className="col-md-3"></div>
      </div>
      <Listar></Listar>
    </div>
  );
}

export default Cards;
