import React from "react";
import { Carousel } from "react-bootstrap";
import "./carousel.css";
import "bootstrap";

function CarouselRender({ product, interval }) {
  return (
    <div className="carousel-container">
      <div className="container-fluid">
        <div className="row"></div>
        <div className="row">
          <div className="col-12">
            <Carousel>
              {product.images.map((item) => (
                <Carousel.Item interval={interval} key={item.id}>
                  <img
                    className="d-block w-100"
                    src={item.imageURL}
                    alt="First slide"
                  />
                  <Carousel.Caption>
                    <h3>{item.title}</h3>
                    <p>{product.description.title}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarouselRender;
