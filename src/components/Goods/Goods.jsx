import React, { useState } from "react";
import NavigationMenu from "../NavigationMenu/NavigationMenu";
import Footer from "../Footer/Footer";
import getQueryParams from "../getQueryParams";
import Product from "../Home/Product/Product";
import products from "./products.json";
export default function Goods() {
  const [filter, setFilter] = useState(getQueryParams()["filter"] || "all");

  // Используйте значение domain для отображения соответствующих данных
  console.log(filter);
  return (
    // Код компонента Goods
    <>
      <NavigationMenu />
      <div className='container'>
        <div className='commodity'>
          <div className='commodity__image'></div>
          <div className='commodity__info'></div>
        </div>
        <div className='commodity__selection'>
          <div className='commodity__selection-item'></div>
          <div className='commodity__selection-item'></div>
          <div className='commodity__selection-item'></div>
        </div>
      </div>
      <div className='container'>
        {products.map((p) => {
          return (
            <Product
              key={p.id}
              id={p.id}
              price={p.price}
              discount={p.discount}
              images={p.images}
              name={p.name}
              reviewer={p.reviewer}
              review={p.review}
              tick={p.tick}
            />
          );
        })}
      </div>

      <Footer />
    </>
  );
}
