import React, { useContext, useState, useEffect, Suspense, lazy } from "react";
import ListarCat from "../../components/categories/Categories";
import SearchBar from "../../components/Buscador/SearchBar";
import Listar from "../../components/List/List";

import { FilterContext } from "../../components/FilterContext";
import { UserContext } from "../../components/UserContext";
import axios from "axios";
import PaginationNumbers from "../../components/Pagination/Pagination";
import Url from "../../util/Url";
import jwt_decode from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleUp,
  faArrowCircleUp,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import Loader from "../../util/Loader";
import "./homefiltered.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [productsPerPage, setProductsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, isLoading] = useState(true);
  localStorage.removeItem("url");

  const indexFirstProduct = (currentPage - 1) * productsPerPage;
  const indexLastProduct = indexFirstProduct + productsPerPage;
  const currentProducts = products.slice(indexFirstProduct, indexLastProduct);

  const pages = Math.ceil(products.length / productsPerPage);
  const { userData, setUserData } = useContext(UserContext);

  function logUser() {
    let token = localStorage.getItem("jwt");

    let decode;

    if (token !== null) {
      decode = jwt_decode(token);
      const getUser = async () => {
        let url = Url() + "/api/user/" + decode.userId;
        const result = await axios.get(url);
        let newUser = result.data;
        setUserData({
          name: newUser.name,
          lastName: newUser.lastName,
          email: newUser.email,
          isLogged: true,
          token: token,
          role: newUser.role,
        });
      };
      getUser();
    }
  }

  logUser();

  const { filterData } = useContext(FilterContext);
  useEffect(() => {
    const getAllProducts = async () => {
      const url = Url() + "/api/product";
      const result = await axios.get(url);
      isLoading(false);
      setProducts(result.data)
    };
    getAllProducts();
   
  }, [filterData]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="main">
      <SearchBar />
      <h1 className="category-title">Bienvenido a Just like Home</h1>
      <h2 className="category-title">Selecciona un tipo de alojamiento</h2>
      <ListarCat />
      <h2 className="recommendation-h2" id="recommendation-h2">
        Recomendados
      </h2>

      {/* <Listar products={currentProducts} /> */}
      {loading ? <Loader /> : <Listar products={currentProducts} />}
      <div className="pagination">
        <p className="to-the-top" onClick={onClick}>
          Volver al inicio{" "}
          <FontAwesomeIcon icon={faArrowUp} className="pagination-icon" />
        </p>
        <PaginationNumbers pages={pages} setCurrentPage={setCurrentPage}/>
      </div>
    </div>
  );
};

export default Home;
