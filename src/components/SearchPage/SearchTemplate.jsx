import React, { useContext, useState, useEffect } from "react";
import { FilterContext } from "../../components/FilterContext";
import Listar from "../../components/List/List";
import Url from "../../util/Url";
import axios from "axios";
import "./searchtemplate.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { faMag } from "@fortawesome/free-regular-svg-icons";
import { faFaceFrown } from "@fortawesome/free-regular-svg-icons";
import moment from "moment/min/moment-with-locales";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import Loader from "../../util/Loader";

const SearchTemplate = () => {
  const [products, setProducts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const { width } = useWindowDimensions();
  const [loading, isLoading] = useState(true);
  const { handleFilterData } = useContext(FilterContext);

  useEffect(() => {
    let url = Url() + "/api/city";
    axios
      .get(url)
      .then((response) => setCities(response.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    let url = Url() + "/api/category";
    axios
      .get(url)
      .then((response) => setCategories(response.data))
      .catch((error) => console.log(error));
  }, []);

  const { filterData } = useContext(FilterContext);
  useEffect(() => {
    if (
      filterData.rangeOfDates.checkIn &&
      filterData.rangeOfDates.checkOut &&
      filterData.cityCode &&
      filterData.category
    ) {
      isLoading(true);
      const getProductsByCityAndDatesAndCategory = async () => {
        /* let results;
        let resultsFiltered = []; */
        const url =
          Url() +
          `/api/product/${filterData.cityCode}/${filterData.rangeOfDates.checkIn}/${filterData.rangeOfDates.checkOut}`;
        const result = await axios.get(url);
        let results = result.data;
        let resultsFiltered = [];
        results.forEach((element) => {
          if (element.category.code === filterData.category) {
            resultsFiltered.push(element);
          }
        });
        setProducts(resultsFiltered);
        result.finally(isLoading(false));
      };
      getProductsByCityAndDatesAndCategory();
    } else if (
      filterData.rangeOfDates.checkIn &&
      filterData.rangeOfDates.checkOut &&
      filterData.cityCode
    ) {
      isLoading(true);
      const getProductsByDatesAndCity = async () => {
        let checkIn = filterData.rangeOfDates.checkIn.replaceAll("/", "-");
        let checkOut = filterData.rangeOfDates.checkOut.replaceAll("/", "-");

        const url = Url() + `/api/product/${checkIn}/${checkOut}`;
        const result = await axios.get(url);
        let results = result.data;
        let resultsFiltered = [];
        setProducts(result.data);
        results.forEach((element) => {
          if (element.city.code === filterData.cityCode) {
            resultsFiltered.push(element);
          }
        });
        setProducts(resultsFiltered);
        result.finally(isLoading(false));
      };
      getProductsByDatesAndCity();
    } else if (
      filterData.rangeOfDates.checkIn &&
      filterData.rangeOfDates.checkOut &&
      filterData.category
    ) {
      isLoading(true);
      const getProductsByDatesAndCategory = async () => {
        let checkIn = filterData.rangeOfDates.checkIn.replaceAll("/", "-");
        let checkOut = filterData.rangeOfDates.checkOut.replaceAll("/", "-");

        const url = Url() + `/api/product/${checkIn}/${checkOut}`;
        const result = await axios.get(url);
        let results = result.data;
        let resultsFiltered = [];
        setProducts(result.data);
        results.forEach((element) => {
          if (element.category.code === filterData.category) {
            resultsFiltered.push(element);
          }
        });
        setProducts(resultsFiltered);
        result.finally(isLoading(false));
      };
      getProductsByDatesAndCategory();
    } else if (filterData.cityCode && filterData.category) {
      isLoading(true);
      const getProductsByCityAndCategory = async () => {
        const url =
          Url() + `/api/product/productCity/id/${filterData.cityCode}`;
        const result = await axios.get(url);
        let results = result.data;
        let resultsFiltered = [];

        results.forEach((element) => {
          if (element.category.code === filterData.category) {
            resultsFiltered.push(element);
          }
          /* element.city.code == filterData.cityCode ? resultsFiltered.push(element) : null */
        });

        setProducts(resultsFiltered);
        result.finally(isLoading(false));
      };
      getProductsByCityAndCategory();
    } else if (
      filterData.rangeOfDates.checkIn &&
      filterData.rangeOfDates.checkOut
    ) {
      isLoading(true);
      const getProductsByDates = async () => {
        let checkIn = filterData.rangeOfDates.checkIn.replaceAll("/", "-");
        let checkOut = filterData.rangeOfDates.checkOut.replaceAll("/", "-");

        const url = Url() + `/api/product/${checkIn}/${checkOut}`;
        const result = await axios.get(url);
        result.finally(setProducts(result.data), isLoading(false));

        setProducts(result.data);
      };
      getProductsByDates();
    } else if (filterData.cityCode && filterData.category) {
      isLoading(true);
      const getProductsByCityAndCategory = async () => {
        const url =
          Url() + `/api/product/productCity/id/${filterData.cityCode}`;
        const result = await axios.get(url);
        let results = result.data;
        console.log(results);
        let resultsFiltered = [];

        results.forEach((element) => {
          if (element.category.code === filterData.category) {
            resultsFiltered.push(element);
          }
          /* element.city.code == filterData.cityCode ? resultsFiltered.push(element) : null */
        });
        result.finally(isLoading(false));
        setProducts(resultsFiltered);
      };
      getProductsByCityAndCategory();
    } else if (filterData.category) {
      isLoading(true);
      //console.log('por categoria')
      const getProductsByCategory = async () => {
        const url =
          Url() + `/api/product/productCategory/code/${filterData.category}`;
        const result = await axios.get(url);
        result.finally(setProducts(result.data), isLoading(false)); /* 
        setProducts(result.data); */
      };
      getProductsByCategory();
    } else if (filterData.cityCode) {
      isLoading(true);
      const getProductsByCity = async () => {
        const url =
          Url() + `/api/product/productCity/id/${filterData.cityCode}`;
        const result = await axios.get(url);
        result.finally(setProducts(result.data), isLoading(false)); /* 
        setProducts(result.data); */
      };
      getProductsByCity();
    } else {
      isLoading(true);
      const getAllProducts = async () => {
        const url = Url() + "/api/product";
        const result = await axios.get(url);
        result.finally(setProducts(result.data), isLoading(false)); /* 
        setProducts(result.data); */
      };
      getAllProducts();
    }

   
  }, [filterData]);

  function RenderFilters() {
    let checkIn = filterData.rangeOfDates.checkIn;
    let checkOut = filterData.rangeOfDates.checkOut;
    let city;
    let category;

    if(filterData.category == "cabania"){
      category = "cabaña"
    } else if(filterData.category == "casaDePlaya"){
      category = "casa de playa"
    } else {
      category = filterData.category
    }

    if(filterData.cityCode == "buenosAires"){
      city = "buenos aires"
    } else if(filterData.cityCode == "bogota"){
      city = "bogotá"
    } else if(filterData.cityCode == "medellin"){
      city = "medellín"
    }  else if(filterData.cityCode == "cordoba"){
      city = "córdoba"
    } else{
      city= filterData.cityCode
    }


    function newDateFormatter(date) {
      const dateDayFirst = moment(date).locale("es");

      return dateDayFirst.format("DD/MM/YYYY");
    }

    function changeDates() {
      if (
        filterData.rangeOfDates.checkIn !== null &&
        filterData.rangeOfDates.checkOut !== null
      ) {
        checkIn = filterData.rangeOfDates.checkIn.replaceAll("-", "/");
        checkOut = filterData.rangeOfDates.checkOut.replaceAll("-", "/");
        checkIn = newDateFormatter(checkIn);
        checkOut = newDateFormatter(checkOut);
      }
    }
    changeDates();

    if (
      filterData.cityCode !== null &&
      filterData.category !== null &&
      filterData.rangeOfDates.checkIn !== null &&
      filterData.rangeOfDates.checkOut !== null
    ) {
      
      return (
        <ul type="none" className="filters-applied">
          <li>
            {city}
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="no-filter"
              onClick={() => handleFilterData({ cityCode: null })}
            />
          </li>
          <li>
            {category}
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="no-filter"
              onClick={() => handleFilterData({ category: null })}
            />
          </li>
          <li>
            {checkIn} -{checkOut}
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="no-filter"
              onClick={() =>
                handleFilterData({
                  rangeOfDates: {
                    checkIn: null,
                    checkOut: null,
                  },
                })
              }
            />
          </li>
        </ul>
      );
    } else if (
      filterData.cityCode !== null &&
      filterData.rangeOfDates.checkIn !== null &&
      filterData.rangeOfDates.checkOut !== null
    ) {
      return (
        <ul type="none" className="filters-applied">
          <li>
            {city}
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="no-filter"
              onClick={() => handleFilterData({ cityCode: null })}
            />
          </li>
          <li>
            {checkIn} -{checkOut}
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="no-filter"
              onClick={() =>
                handleFilterData({
                  rangeOfDates: {
                    checkIn: null,
                    checkOut: null,
                  },
                })
              }
            />
          </li>
        </ul>
      );
    } else if (
      filterData.category !== null &&
      filterData.rangeOfDates.checkIn !== null &&
      filterData.rangeOfDates.checkOut !== null
    ) {
      return (
        <ul type="none" className="filters-applied">
          <li>
            {category}
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="no-filter"
              onClick={() => handleFilterData({ category: null })}
            />
          </li>
          <li>
            {checkIn} -{checkOut}
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="no-filter"
              onClick={() =>
                handleFilterData({
                  rangeOfDates: {
                    checkIn: null,
                    checkOut: null,
                  },
                })
              }
            />
          </li>
        </ul>
      );
    } else if (filterData.cityCode !== null && filterData.category !== null) {
      return (
        <ul type="none" className="filters-applied">
          <li>
            {city}
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="no-filter"
              onClick={() => handleFilterData({ cityCode: null })}
            />
          </li>
          <li>
            {category}
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="no-filter"
              onClick={() => handleFilterData({ category: null })}
            />
          </li>
        </ul>
      );
    } else if (filterData.cityCode !== null) {
      return (
        <ul type="none" className="filters-applied">
          <li>
            {city}
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="no-filter"
              onClick={() => handleFilterData({ cityCode: null })}
            />
          </li>
        </ul>
      );
    } else if (filterData.category !== null) {
      return (
        <ul type="none" className="filters-applied">
          <li>
            {category}
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="no-filter"
              onClick={() => handleFilterData({ category: null })}
            />
          </li>
        </ul>
      );
    } else if (
      filterData.rangeOfDates.checkIn !== null &&
      filterData.rangeOfDates.checkOut !== null
    ) {
      return (
        <ul type="none" className="filters-applied">
          <li>
            {checkIn} -{checkOut}
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="no-filter"
              onClick={() =>
                handleFilterData({
                  rangeOfDates: {
                    checkIn: null,
                    checkOut: null,
                  },
                })
              }
            />
          </li>
        </ul>
      );
    }
  }

  function FiltersCategories({ width }) {
    if (width >= 768) {
      return (
        <div className="filters-container">
          <div className="categories">
            <h3>Categorías</h3>
            <ul type="none">
              {categories.map((item) => (
                <li
                  key={item.code}
                  onClick={() => handleFilterData({ category: item.code })}
                >
                  {item.title}
                </li>
              ))}
            </ul>
          </div>
          <div className="cities">
            <h3>Ciudades</h3>
            <ul type="none">
              {cities.map((item) => (
                <li
                  key={item.code}
                  onClick={() => handleFilterData({ cityCode: item.code })}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    } else {
      return (
        <div className="filters-container">
          <div className="categories">
            <h3>Categorías</h3>
            <select
              name="city"
              onChange={(e) => handleFilterData({ category: e.target.value })}
              className="filter-categories"
            >
              <option value="">Selecciona una categoria</option>
              {categories.map((category, index) => (
                <option value={category.code} key={index}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>
          <div className="cities">
            <h3>Ciudades</h3>
            <select
              name="city"
              onChange={(e) => handleFilterData({ cityCode: e.target.value })}
              className="filter-cities"
            >
              <option value="">Selecciona una ciudad</option>
              {cities.map((city, index) => (
                <option value={city.code} key={index}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      );
    }
  }

  const onClick = () => {
    document.getElementById("search-bar").scrollIntoView();
  };
  
  function NoResultsRender({products}){
    if(products.length === 0){
      setNoResults(true)
      return(
        <div className="no-matches">

           <h2>Ups... parece que está vacío

            </h2> 
        </div>
      )
    } else {
      setNoResults(false)
      return(<Listar products={products} />)
      
    }
    
  }

  return (
    <div className="page">
      <div className="filter-header">
        <h2>Resultados de tu búsqueda:</h2>
        <ul type="none" className="filters-applied">
          <RenderFilters width={width} />
        </ul>
      </div>
      <div className="filters">
        <FiltersCategories width={width} />
        {/* {loading ? <Loader /> : <Listar products={products} />}
        {noResults ? <NoResultsRender /> : null} */}
        {loading ? <Loader /> : <NoResultsRender products={products} />}
      </div>
    </div>
  );
};

export default SearchTemplate;
