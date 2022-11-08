import React from "react";
import { useEffect, useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./product.css";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faShareSquare } from "@fortawesome/free-regular-svg-icons";
import { faMap } from "@fortawesome/free-regular-svg-icons";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import ProductHeader from "./ProductHeader";
import Amenities from "./Amenities";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import CarouselRender from "../Carousel/Carousel";
import CalendarReservation from "../CalendarReservation/CalendarReservation";
import Url from "../../util/Url";
import PoliciesRender from "./Policies";
import { ReservationContext } from "../ReservationContext";
import moment from "moment";
import Loader from "../../util/Loader";

/* function ImagesRender({ product }) {
  let arrayImages = [];
  for (let i = 0; i <= 4; i++) {
    if (product.images[i].main_img == 0) {
      arrayImages.push(product.images[i]);
    }
  }
  arrayImages = arrayImages.slice(0, 4);
  return arrayImages.map((item) => (
    <div key={item.id}>
      <img src={item.imageURL} />
    </div>
  ));
}

function ImagesMain({ item }) {
  let mainImage;
  for (let i = 0; i < item.images.length; i++) {
    if (item.images[i].main_img == 1) {
      mainImage = item.images[i].imageURL;
    }
  }

  return <img src={mainImage} />;
} */

export function PoliciesRender2({ product }) {
  let rules = product.policy.rules;
  let arrayRules = rules.split(",");
  let health_safety = product.policy.health_safety;
  let arrayHealth = health_safety.split(",");
  let cancellation_policy = product.policy.cancellation_policy;
  let arrayCancellation = cancellation_policy.split(",");

  return (
    <div className="policies">
      <h2>Qué tenés que saber</h2>
      <hr></hr>
      <div className="policies-container">
        <div className="rules-container">
          <h3>Normas de la casa</h3>
          <ul type="none">
            {arrayRules.map((item) => (
              <li>{item}</li>
            ))}
          </ul>
        </div>
        <div className="healthSafety-container">
          <h3>Salud y seguridad</h3>
          <ul type="none">
            {arrayHealth.map((item) => (
              <li>{item}</li>
            ))}
          </ul>
        </div>
        <div className="cancellation-container">
          <h3>Política de cancelación</h3>
          <ul type="none">
            {arrayCancellation.map((item) => (
              <li>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Product() {
  const [productInfo, setProductInfo] = useState();
  const [loading, isLoading] = useState(true);
  const { width } = useWindowDimensions();
  let location = window.location.pathname;
  const [isActive, setActive] = useState(false);
  const handleToggle = () => {
    setActive(!isActive);
  };

  /* ------- CODIGO PARA EL FETCH DEL PRODUCTO ------- */
  function Fetch() {
    let url = Url() + "/api" + location;
    useEffect(() => {
      axios
        .get(url)
        .then((response) => setProductInfo(response.data))
        .catch((error) => console.log(error));
      /*         .finally(isLoading(false)); */
    }, [url]);
  }

  Fetch();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // GET PARA TRAER RESERVACIONES DEL PRODUCTO Y USARLO EN EL CALENDARIO

  let locationPath = location.split("/");
  let locationId = locationPath[2];

  const { reservationsDates, setReservationsDates } =
    useContext(ReservationContext);
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    const getProductReservationDays = async () => {
      try {
        const url = Url() + "/api/reservation/findProduct/" + locationId;
        const result = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setReservationsDates(result.data);
      } catch (e) {
        console.log(e.message);
      }
    };
    getProductReservationDays();
  }, [locationId]);

  // DESHABILITA LAS FECHAS RESERVADAS EN EL CALENDARIO
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

  /* ----- Tipo de carousel renderizado segun device width ----- */
  function CarouselDevice({ width, product }) {
    if (width >= 1024) {
      return (
        <div
          className={
            isActive ? "carousel-container-show" : "carousel-container"
          }
        >
          <FontAwesomeIcon
            icon={faCircleXmark}
            className="carousel-close"
            onClick={handleToggle}
          />
          <CarouselRender product={product} interval="100000" />
        </div>
      );
    } else {
      return <CarouselRender product={product} interval="3000" />;
    }
  }

  /* const rendered= () => {
  alert("image rendered");
}
const startRender= () => {
  requestAnimationFrame(rendered());
}
const loaded = () => {
  requestAnimationFrame(startRender());
} */
  function ImagesRender({ product }) {
    let arrayImages = [];
    for (let i = 0; i <= 4; i++) {
      if (product.images[i].main_img == 0) {
        arrayImages.push(product.images[i]);
      }
    }
    arrayImages = arrayImages.slice(0, 4);
    if (arrayImages.length == 4) {
      isLoading(false);
    }
    return arrayImages.map((item) => (
      <div key={item.id}>
        <img src={item.imageURL} />
      </div>
    ));
  }

  function ImagesMain({ item }) {
    let mainImage;
    for (let i = 0; i < item.images.length; i++) {
      if (item.images[i].main_img == 1) {
        mainImage = item.images[i].imageURL;
      }
    }
    return <img src={mainImage} />;
  }

  const myTimeout = setTimeout(setLoading, 3000);
function setLoading(){
isLoading(false)
}


  /* localStorage.setItem("url", locationId); */
 


  return (
    <div className="main">
      {productInfo && (
        <div className="main">
          <ProductHeader
            category={productInfo.category.title}
            title={productInfo.title}
            path="/"
          />
          <div className="product">
            <div className="product-location-container">
              <div className="product-location">
                <p>
                  {productInfo.city.name}, {productInfo.city.country}
                </p>
                <p>
                  <FontAwesomeIcon icon={faMap} /> A 320m del centro
                </p>
              </div>

              <div className="product-rating">
                <div>
                  <p>Muy bueno</p>
                  <FontAwesomeIcon icon={faHeart} />
                  <FontAwesomeIcon icon={faHeart} />
                  <FontAwesomeIcon icon={faHeart} />
                  <FontAwesomeIcon icon={faHeart} />
                  <FontAwesomeIcon icon={faHeart} />
                </div>
                <p>8</p>
              </div>
            </div>

            <div className="socialIcons">
              <FontAwesomeIcon icon={faShareSquare} />
              <FontAwesomeIcon icon={faHeart} />
            </div>
              {loading ? (
                <Loader />
              ) : (
                <div className="gallery-container">
                  <div id="mainImage">
                    <ImagesMain item={productInfo} />
                  </div>
                  <ImagesRender product={productInfo} />
                </div>
              )} 
            <p className="gallery-p" onClick={handleToggle}>
              Ver más
            </p>

            {/* <FontAwesomeIcon icon={faCircleXmark} className="carousel-close" onClick={handleToggle}/> */}
            <CarouselDevice width={width} product={productInfo} />
            <div className="description">
              <h2>{productInfo.description_title}</h2>
              <p>{productInfo.description}</p>
            </div>
            <div className="amenities">
              <h2>¿Qué ofrece este lugar?</h2>
              <hr></hr>
              <div className="characteristics">
                <Amenities product={productInfo} />
              </div>
            </div>

            <CalendarReservation
              id={productInfo.id}
              disabledD={disabledDates}
            />

            <PoliciesRender product={productInfo} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Product;
