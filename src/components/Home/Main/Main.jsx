import React, { useState } from "react";
import "./Main.css";
import backpack from "../../../images/goods/backpack.jpg";
import kitty from "../../../images/goods/kitty.jpg";
import coat from "../../../images/goods/coat.jpg";
import pants from "../../../images/goods/pants.jpg";
import Product from "../Product/Product";
import Slider from "../../Slider/Slider";
import ModalReview from "../../Modals/ModalReview";
import { Carousel } from "react-bootstrap";
import products from "./products.json";
import scrollTo from "../../scrollTo";
function Main() {
  const [aboutImages] = useState([backpack, kitty, coat, pants]);

  return (
    <main className='main '>
      <section className='section__about container' id='about'>
        <div className='about__text'>
          <h2>Наш магазин предлагает широкий выбор кожаной одежды</h2>
          <p>
            Мы специализируемся на качественной кожаной одежде, которая
            прослужит вам долгие годы. В нашем ассортименте вы найдете:
          </p>
          <ul>
            <li>Куртки из натуральной кожи.</li>
            <li>Пальто.</li>
            <li>Кожаные штаны.</li>
            <li>Кожаные сумки.</li>
            <li>
              Аксессуары, такие как кожаные перчатки и ремни, которые придадут
              вашему образу завершенность и стиль (вашему котику тоже
              понравятся)
            </li>
          </ul>
        </div>
        <Slider images={aboutImages} />
        <a href='#more-about' onClick={scrollTo}>
          <button className='button'>Узнать больше </button>
        </a>
      </section>
      <section className='section__shop container' id='shop'>
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
      </section>
      <section className='section__FAQ' id='FAQ'>
        <h2>Часто задаваемые вопросы</h2>
        <Carousel>
          <Carousel.Item>
            <div className='faq-carusel'>
              <h3>Как сделать заказ?</h3>
              <p>
                Для добавления нового заказа вам необходимо нажать на кнопку
                "Купить", <br />
                ввести адрес по которому вам должен прийти заказ и оплатить его
                с помощью карты или спб <br />
                (карты через которые можно оплачивать указаны при заполнении)
              </p>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className='faq-carusel'>
              <h3>Как изменить пароль?</h3>
              <p>
                Для изменения пароля зайдите в настройки аккаунта и выберите
                пункт "Изменить". <br /> Введите новый пароль и нажмите кнопку
                "Сохранить".
              </p>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className='faq-carusel'>
              <h3>Как связаться с поддержкой?</h3>
              <p>
                Для связи с нашей службой поддержки вы можете отправить нам
                сообщение <br /> через форму на странице "Контакты" или написать
                нам в Вк, Телеграмме <br /> или на почту support@example.com.
              </p>
            </div>
          </Carousel.Item>
        </Carousel>
        <h4>Остались вопросы, или хотите оставить отзыв?</h4>
        <ModalReview id='review'></ModalReview>
      </section>
      <section className='section__more-about container' id='more-about'>
        <h2> Широкий ассортимент кожаных изделий</h2>
        <p>
          У нас вы найдете кожаные куртки, пальто, брюки, юбки, платья, обувь,
          сумки, ремни, перчатки и многое другое. Все изделия изготовлены из
          натуральной кожи разных видов: телячьей, овечьей, козьей, замшевой и
          даже экзотической. Мы подбираем кожу с особой тщательностью, чтобы она
          была мягкой, гладкой и долговечной.
        </p>
        <h2> Индивидуальный пошив по вашему вкусу</h2>
        <p>
          Наш магазин предлагает вам не только готовые изделия из кожи, но и
          возможность заказать индивидуальный пошив по вашим меркам и
          пожеланиям. Вы можете выбрать цвет, фасон, декоративные элементы и
          аксессуары для своего кожаного наряда. Мы гарантируем вам высокий
          уровень обслуживания и быструю доставку.
        </p>
        <h2> Посетите наш магазин прямо сейчас!</h2>
        <p>
          Не упустите свой шанс обновить свой гардероб и подчеркнуть свою
          индивидуальность с помощью наших кожаных изделий. Посетите наш магазин
          прямо сейчас и убедитесь сами в том, что настоящая кожа - это для
          настоящих мужчин и настоящих женщин!
        </p>
      </section>
      <section className='container section__find-us'>
        <h2>Где нас найти? </h2>

        <div className='google-map'>
          <iframe
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d511.75083604283265!2d49.124408630576006!3d55.788929798825855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x415ead11bbbba3d9%3A0xe7ab333ce9f9c17b!2z0YPQuy4g0J_Rg9GI0LrQuNC90LAsIDEyLCDQmtCw0LfQsNC90YwsINCg0LXRgdC_LiDQotCw0YLQsNGA0YHRgtCw0L0sIDQyMDAxMg!5e0!3m2!1sru!2sru!4v1637671938726!5m2!1sru!2sru'
            width='100%'
            height='500'
            style={{ border: 0 }}
            allowFullScreen=''
            loading='lazy'
            title='our-polojenie'
          ></iframe>
        </div>
        <p>
          Наш магазин находится по адресу: ул. Пушкина, д. 12, ТЦ “Кожевник”, 3
          этаж, павильон 312. Мы работаем с 10:00 до 20:00 без выходных и
          перерывов.
        </p>
        <h2>Свяжитесь с нами!</h2>
      </section>
    </main>
  );
}
export default Main;
