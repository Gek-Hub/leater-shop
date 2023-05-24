import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationMenu from "../NavigationMenu/NavigationMenu";
function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // отправка запроса на сервер для авторизации пользователя
    fetch("http://localhost:5000/login", {
      method: "POST", // метод запроса
      headers: {
        "Content-Type": "application/json", // тип данных, отправляемых на сервер
      },
      body: JSON.stringify({
        // данные для отправки на сервер
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json()) // обработка ответа от сервера
      .then((data) => {
        // обработка данных, полученных от сервера
        console.log(data);
        if (data.status === 200) {
          // перенаправление на страницу с данными пользователя после успешной авторизации
          navigate(`/dashboard?id=${data.user[0]}`);
        } else if ((data.status = 401)) {
          var errorMessage = document.getElementById("error-message");
          errorMessage.innerHTML = "Ошибка. Неправильный логин или пароль.";
        }
        // перенаправление на страницу после авторизации
      })
      .catch((error) => {
        console.error(error);
      });
    // сделать
  };

  return (
    <>
      <NavigationMenu />
      <form className='atr-form container' onSubmit={handleSubmit}>
        <h2>Введите имя пользователя и пароль:</h2>
        <div id='error-message'></div>
        <label className='atr-label'>
          Username:
          <input type='text' value={username} onChange={handleUsernameChange} />
        </label>
        <label className='atr-label'>
          Password:
          <input
            type='password'
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <button className='button' type='submit'>
          Login
        </button>
        <a className='atr-a' href='../signup'>
          Sign up
        </a>
        <a className='atr-a' href='../'>
          Home page
        </a>
      </form>
    </>
  );
}

export default Login;
