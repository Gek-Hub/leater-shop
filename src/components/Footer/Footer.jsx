import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import "./Footer.css";
import IconLinks from "../IconLinks/IconLinks";
function Footer(props) {
  return (
    <Navbar
      className='footer'
      variant='dark'
      dark='true'
      expand='lg'
      id='contacts'
    >
      <Container fluid>
        <Nav className='me-auto my-2 my-lg-0 ' navbarScroll>
          <p>
            <span>Phone:</span> +7 (495) 123-45-67
          </p>
          <p>
            <span>Email:</span> solid-leath@mail.ru
          </p>
          <p>
            <span>Site:</span> www.solid-leath.ru
          </p>
          <IconLinks></IconLinks>
        </Nav>
        <div className='d-flex'>
          <Navbar.Brand className='logo' href='#Home'>
            <div className='logo-image'>
              <img src='./images/logo.jpg' alt='logo' />
            </div>
            <div className='logo-text'>
              <div> SOLID LEATH</div>
              <div>
                <span>by GEK</span>
              </div>
            </div>
          </Navbar.Brand>
          <p className='text-white'>© 2023 SOLID LEATH. All rights reserved.</p>
        </div>
      </Container>
    </Navbar>
  );
}

export default Footer;
