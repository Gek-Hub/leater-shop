import React, { useEffect, useState } from "react";
import "./Product.css";
import Slider from "../../Slider/Slider";
import haveFileInPath from "../../haveFileInPath";

export default function Product(props) {
  const [images, setImages] = useState([]);
  const [imageIndex, setImageIndex] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    let imagePath = `./images/goods/${props.images}_${imageIndex}.jpg`;
    haveFileInPath(imagePath, () => {
      setImages((prevImages) => {
        if (!prevImages.includes(imagePath)) {
          setImageIndex((i) => i + 1);
          setIsLoading(true);
          return [...prevImages, imagePath];
        } else {
          setIsLoading(false);
          return prevImages;
        }
      });
    });
  }, [imageIndex, images]);

  return (
    <div className='product-container'>
      <div className='product-image-slider'>
        {isLoading ? (
          <Slider version='2' images={images} tick={props.tick} />
        ) : (
          <div className='loader'></div>
        )}
      </div>
      <div className='product-details'>
        <h2 className='product-name'>{props.name || "Название товара"}</h2>
        <div className='product-props'>
          <label htmlFor={`product-size-${props.id}`}>Размер:</label>
          <br />
          <select id={`product-size-${props.id}`}>
            <option value='s'>S</option>
            <option value='m'>M</option>
            <option value='l'>L</option>
            <option value='l'>XL</option>
          </select>
          <br />
          <label htmlFor={`product-color-${props.id}`}>Цвет:</label>
          <br />
          <select id={`product-color-${props.id}`}>
            <option value='natural'>Натуральный</option>
            <option value='brown'>Темно коричневый</option>
            <option value='black'>Черный</option>
            <option value='white'>Белый</option>
          </select>
          <br />
          <br />
          <span className='product-price'>{props.price + " руб."}</span>
          <span className='product-discount'>{props.discount} руб.</span>
          <button className='buy-button'>Купить</button>
        </div>
        <div className='product-review'>
          <h3>Отзывы клиентов</h3>
          <div className='review-text'>
            <p>{props.review}</p>
          </div>
          <div className='review-image-container'>
            <img
              className='review-image'
              src={props.reviewer || "./images/users/no_file.jpg"}
              alt='Фото клиента'
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
}
