import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
export default function ModalReview() {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    feedback_type: "Отзыв",
    contact_info: "",
    review: "",
    rating: "",
  });
  const isValidEmail = (email) => {
    // регулярное выражение для проверки адреса электронной почты
    const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return emailRegex.test(email);
  };

  const isValidPhoneNumber = (phoneNumber) => {
    // регулярное выражение для проверки номера телефона
    const phoneRegex = /^\+?[0-9]{6,14}$/;
    return phoneRegex.test(phoneNumber);
  };

  const isContactInfoValid = () => {
    const contactInfo = formData.contact_info;
    return isValidEmail(contactInfo) || isValidPhoneNumber(contactInfo);
  };

  const isFormValid = () => {
    return isContactInfoValid() && (formData.review || formData.rating);
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSave = async () => {
    // здесь вы можете добавить свой код для обработки данных формы
    console.log(formData);
    fetch("http://localhost:5000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          alert(`Ваш фитбэк успешно отправлен! \n${data.message}`);
        } else {
          // обработка ошибки
          alert("Что-то на сервенре пошло не так...");
        }
        handleClose();
      });
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className='rebutton' variant='primary' onClick={handleShow}>
        Оставить отзыв/Задать вопрос
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Оставьте свой отзыв</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId='formBasicType'>
              <Form.Label>Вид обратной связи</Form.Label>
              <Form.Select name='feedback_type' onChange={handleInputChange}>
                <option value='Отзыв'>Отзыв</option>{" "}
                <option value='Обращение в поддержку'>
                  Обращение в поддержку
                </option>{" "}
              </Form.Select>
            </Form.Group>
            <Form.Group controlId='formBasicEmail'>
              <Form.Label>Контактная информация</Form.Label>
              <Form.Control
                type='email'
                placeholder='Введите email или телефон'
                name='contact_info'
                onChange={handleInputChange}
              />
              {!isContactInfoValid() && (
                <Form.Text className='text-danger'>
                  Пожалуйста, введите верно адрес электронной почты или номер
                  телефона.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId='formBasicPassword'>
              <Form.Label>Отзыв</Form.Label>
              <Form.Control
                as='textarea'
                rows={3}
                name='review'
                onChange={handleInputChange}
              />
            </Form.Group>

            <fieldset>
              <Form.Group>
                <Form.Label as='legend'>Оценка сервиса</Form.Label>
                {[1, 2, 3, 4, 5].map((value) => (
                  <Form.Check
                    key={value}
                    inline
                    label={value}
                    value={value}
                    type='radio'
                    name='rating'
                    id={`rating-${value}`}
                    onChange={handleInputChange}
                  />
                ))}
              </Form.Group>
            </fieldset>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {!(formData.review || formData.rating) && (
            <Form.Text className='text-danger'>
              Пожалуйста, заполните одно из 2х полей: "Отзыв", "Оценка".
            </Form.Text>
          )}
          <Button variant='secondary' onClick={handleClose}>
            Закрыть
          </Button>
          <Button
            className='button'
            variant='dark'
            onClick={handleSave}
            disabled={!isFormValid()}
          >
            Отправить
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
