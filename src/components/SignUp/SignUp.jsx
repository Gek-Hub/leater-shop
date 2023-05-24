import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationMenu from "../NavigationMenu/NavigationMenu";
export default function SignUp() {
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
    submit_password: "",
    last_name: "",
    first_name: "",
    about: "",
  });
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [submitPasswordError, setSubmitPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false); // добавляем состояние для отслеживания валидности формы

  const handleChange = (event) => {
    const { id, value } = event.target;
    setUser((prevUser) => ({ ...prevUser, [id]: value }));
  };
  const validateForm = () => {
    const requiredFields = [
      "username",
      "password",
      "submit_password",
      "first_name",
      "last_name",
      "email",
    ];
    const filledFields = requiredFields.filter(
      (field) => user[field].trim() !== ""
    ); // проверяем, что все обязательные поля заполнены
    const isValid = filledFields.length === requiredFields.length;

    // проверяем, что пароль содержит только буквы и цифры
    const passwordRegex = /^[A-Za-z0-9]+$/;
    const isPasswordValid = passwordRegex.test(user.password);
    setPasswordError(
      isPasswordValid ? "" : "Пароль должен содержать только буквы и цифры"
    );

    // проверяем, что email введен в правильном формате
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(user.email);
    console.log(isEmailValid);
    setEmailError(isEmailValid ? "" : "Введите email в правильном формате");

    // проверяем, что username содержит только буквы и цифры
    const usernameRegex = /^[A-Za-z0-9]+$/;
    const isUsernameValid = usernameRegex.test(user.username);
    setUsernameError(
      isUsernameValid ? "" : "Username должен содержать только буквы и цифры"
    );
    const isSubmitValid = user.password === user.submit_password;
    setSubmitPasswordError(isSubmitValid ? "" : "Пароли должны совпадать");
    setIsFormValid(
      isValid && isPasswordValid && isEmailValid && isUsernameValid
    );
  };

  const handleBlur = () => {
    validateForm();
  };
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Отправка данных на сервер
    fetch(`http://localhost:5000/signup`, {
      method: "POST", // метод запроса
      headers: {
        "Content-Type": "application/json", // тип данных, отправляемых на сервер
      },
      body: JSON.stringify({ user: user }),
    })
      .then((response) => response.json()) // обработка ответа от сервера
      .then((data) => {
        console.log(JSON.stringify(data.user));
        if (data.status === 200) {
          navigate(`/dashboard?id=${data.user.id}`);
        } else {
          alert("Error: " + data.message + "!");
        }
      });
  };

  return (
    <div className='profile'>
      <NavigationMenu isAuth={false} />
      <div className='container'>
        <h1>
          Приветствуем, Зарегистрируйтесь в нашей системе
          <br /> чтобы делать заказы!
        </h1>
        <div className='content'>
          <form className='user-data' onSubmit={handleSubmit}>
            <div>
              <p htmlFor='email'>Email:</p>
              <input
                type='text'
                id='email'
                placeholder='example@example.ex'
                value={user.email}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {emailError && <p className='error'>{emailError}</p>}
              {/* добавляем сообщение об ошибке */}
            </div>
            <div>
              <p htmlFor='username'>Username:</p>
              <input
                type='text'
                id='username'
                placeholder='exampleuser1'
                value={user.username}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {usernameError && <p className='error'>{usernameError}</p>}{" "}
            </div>
            <div>
              <p htmlFor='password'>Password:</p>
              <input
                type='password'
                id='password'
                value={user.password}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {passwordError && <p className='error'>{passwordError}</p>}
            </div>
            <div>
              <p htmlFor='submit_password'>Submit password:</p>
              <input
                type='password'
                id='submit_password'
                value={user.submit_password}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {submitPasswordError && (
                <p className='error'>{submitPasswordError}</p>
              )}
            </div>
            <div>
              <p htmlFor='last_name'>Фамилия:</p>
              <input
                type='text'
                id='last_name'
                onBlur={handleBlur}
                value={user.last_name}
                onChange={handleChange}
              />
            </div>
            <div>
              <p htmlFor='first_name'>Имя:</p>
              <input
                type='text'
                id='first_name'
                value={user.first_name}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
            </div>
            <div>
              <p htmlFor='about'>О себе:</p>
              <textarea
                type='textarea'
                id='about'
                value={user.about}
                onChange={handleChange}
              />
            </div>

            <button className='button' type='submit' disabled={!isFormValid}>
              Сохранить
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
