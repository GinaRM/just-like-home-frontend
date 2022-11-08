import React from "react";
import Listar from "./List";

function Cards({ filter }) {
  return (
    <div className="container d-flex justify-content-left">
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
      <Listar filter={filter}></Listar>
    </div>
  );
}

export default Cards;
