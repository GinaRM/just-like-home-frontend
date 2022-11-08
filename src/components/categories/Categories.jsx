import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FilterContext } from "../FilterContext";
import Url from "../../util/Url";
import { Link } from "react-router-dom";

const Categorias = () => {
  const { handleFilterData } = useContext(FilterContext);

  const [categoryInfo, setCategoryInfo] = useState([]);

  useEffect(() => {
    let url = Url() + "/api/category";
    axios
      .get(url)
      .then((response) => setCategoryInfo(response.data))
      .catch((error) => console.log(error));
  }, []);

  return categoryInfo.map((item) => (
    <div
      key={item.id}
      className="card card-shadow m-3 home-card"
      onClick={() => handleFilterData({ category: item.code })}
    >
      <Link
        to="/filtrado"
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        <img src={item.imageURL} className="card-img-top" />
        <div className="card-title" key={item.id}>
          <h2> {item.title}</h2>
          <p className="card-text">{item.description}</p>
        </div>
      </Link>
    </div>
  ));
};

function ListarCat() {
  return (
    <div className="card-deck">
      <div className="cards-container-category">
        <Categorias />
      </div>
    </div>
  );
}

export default ListarCat;
