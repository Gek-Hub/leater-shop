import React, { useEffect, useState } from "react";
import "./Slider.css";
import { Carousel } from "react-bootstrap";
export default function Slider(props) {
  const [images, setImages] = useState([]);
  const [indexImage, setIndexImage] = useState(0);
  useEffect(() => {
    setImages(props.images || []);
    const interval = setInterval(() => {
      setIndexImage((index) => (index + 1) % images.length);
    }, props.tick || 6000);
    return () => clearInterval(interval);
  }, [props.images.length, images.length]);
  return props.version === "2" ? (
    <Carousel>
      {props.images.map((image, index) => (
        <Carousel.Item key={index}>
          <img className='d-block w-100' src={image} alt='фото' />
        </Carousel.Item>
      ))}
    </Carousel>
  ) : (
    <div className='slider-image'>
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt='фото'
          className={`${index === indexImage ? "active" : ""}`}
        />
      ))}
    </div>
  );
}
