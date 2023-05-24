import Button from "react-bootstrap/Button";
import React from "react";
import "./header.css";
import NavigationMenu from "../../NavigationMenu/NavigationMenu";
const Header = (props) => {
  return (
    <header className='header'>
      <NavigationMenu />
      <div className='welcome' id='Home'>
        <div className='header__container container'>
          <div className='welcome__vasya'></div>
          <div className='content'>
            <div className='text'>
              <h1>Настоящая кожа для настоящих мужчин и настоящих женщин</h1>
              <br />
              <p>
                Добро пожаловать в наш магазин! Мы рады предложить вам лучшие
                изделия из кожи, которые придадут вашему образу стильный и
                солидный вид. Наша продукция сочетает в себе высокое качество,
                оригинальный дизайн и непревзойденный комфорт, что делает ее
                идеальной для вас.
              </p>
            </div>
            <Button className='button' href='#shop'>
              Посмотреть ассортимент
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
