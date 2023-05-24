import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./NM.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import getQueryParams from "../getQueryParams";
import scrollTo from "../scrollTo";
import haveFileInPath from "../haveFileInPath";
function NavScroll(props) {
  let [id, setId] = useState(getQueryParams()["id"]);
  const [userImage, setUserImage] = useState("./images/users/no_file.jpg");
  const navigate = useNavigate();
  function handleLogout() {
    // код для выхода из системы
    navigate("../");
    setId(0);
  }
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/dashboard?id=${id}`, {
        method: "GET", // метод запроса
        headers: {
          "Content-Type": "application/json", // тип данных, отправляемых на сервер
        },
      })
        .then((response) => response.json()) // обработка ответа от сервера
        .then((data) => {
          if (data.status === 200) {
            return data.user;
          } else {
            return {};
          }
        })
        .then((user) => {
          // задаем картинку пользователя
          let photoPath =
            "./images/users/" +
            (user.email ? user.email.split("@")[0] : "no_file") +
            ".jpg";
          haveFileInPath(photoPath, () => setUserImage(photoPath));
        });
    }
  }, [id]);

  return (
    <Navbar className='fixed-top' variant='dark' dark='true' expand='lg'>
      <Container fluid>
        <Navbar.Brand
          className='logo'
          href={`http://localhost:3000/${id ? "?id=" + id : ""}#Home`}
        >
          <div>
            SOLID LEATH
            <br />
            <span>by GEK</span>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse id='navbarScroll'>
          <Nav
            className='me-auto my-2 my-lg-0'
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link
              href={`http://localhost:3000/${id ? "?id=" + id : ""}#Home`}
            >
              Домой
            </Nav.Link>
            <Nav.Link href='#about'>О нашем продукте</Nav.Link>
            <Nav.Link href='#FAQ' onClick={scrollTo}>
              FAQ
            </Nav.Link>
            <NavDropdown title='Категории' id='navbarScrollingDropdown'>
              <NavDropdown.Item href='#' disabled>
                Выберите категорию товара
              </NavDropdown.Item>
              <NavDropdown.Item href='goods?filter=male'>
                Мужская одежда
              </NavDropdown.Item>
              <NavDropdown.Item href='goods?filter=female'>
                Женская одежда
              </NavDropdown.Item>
              <NavDropdown.Item href='goods?filter=jacket'>
                Куртки
              </NavDropdown.Item>
              <NavDropdown.Item href='goods?filter=coat'>
                Пальто
              </NavDropdown.Item>
              <NavDropdown.Item href='goods?filter=pants'>
                Штаны
              </NavDropdown.Item>
              <NavDropdown.Item href='goods?filter=accs'>
                Аксессуары
              </NavDropdown.Item>
              <NavDropdown.Item href='goods?filter=bags'>
                Сумки/рюкзаки
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='goods?filter=all'>
                Все товары
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href='#contacts'>Контакты</Nav.Link>
          </Nav>
          <Form className='d-flex'>
            {id ? (
              <>
                <Button variant='outline-success button' onClick={handleLogout}>
                  Logout
                </Button>
                <a href={"/dashboard?id=" + id}>
                  <div className='user-image-container'>
                    <img
                      className='user-image'
                      src={userImage || "./images/users/no_file.jpg"}
                      alt='Фото клиента'
                    ></img>
                  </div>
                </a>
              </>
            ) : (
              <>
                <Button variant='outline-success button' href='/signup'>
                  Sign up
                </Button>
                <Button variant='outline-success rebutton' href='/login'>
                  Log in
                </Button>
              </>
            )}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScroll;
