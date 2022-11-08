import React, { useContext, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { fawashingmachine } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import styles from "../../styles/App.css";
import "bootstrap";
import AcortarDescripcion from "./Description";
import Loader from "../../util/Loader";

/* import Loader from "react-js-loader"; */

function AmenitiesIcons({ product }) {
  return (
    <div className="card-amenities">
      {product.amenities.map((item) => (
        <img src={item.icon} key={item.id}/>
      ))}
    </div>
  );
}

export function ImagesRender({ item }) {
  let mainImage;
  for (let i = 0; i < item.images.length; i++) {
    if (item.images[i].main_img == 1) {
      mainImage = item.images[i].imageURL;
    }
  }

  return <img key={item.id} src={mainImage} className="card-img-top" />;
}

function Cards({ products}) {
  
  /*  if (loading){
    return <Loader type="spinner-circle" bgColor={"#384d58"} title={"Buscando"} color={'#e48561'} size={50} />
  } */

  return products.map((item) => (
    <div className="card card-shadow m-3 home-card" key={item.id}>
      <div className="container-img-cards">
        <ImagesRender item={item} />
      </div>
      <div className="card-title" key={item.id}>
        <h2> {item.title}</h2>
        <p className="card-category">{item.category.title}</p>
        <p className="card-location">
          <FontAwesomeIcon icon={faLocationDot} className="location-icon" />
          {item.city.name}, {item.city.country}
        </p>
        <AmenitiesIcons product={item} />
        <AcortarDescripcion item={item} />
        <Link className="button-2" to={`/product/${item.id}`}>
          Ver Detalles
        </Link>
      </div>
    </div>
  ));
}

function Listar({ products, newLoading }) {

  return (
    <div className="card-deck cards-recommended" >
      <div className="cards-container-recommended">
         <Cards products={products} /> 
      </div>
    </div>
  );
}

export default Listar;
