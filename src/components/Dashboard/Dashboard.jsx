import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationMenu from "../NavigationMenu/NavigationMenu";
import "./Dashboard.css";
import getQueryParams from "../getQueryParams";
import haveFileInPath from "../haveFileInPath";
export default function Dashboard(props) {
  const [id] = useState(getQueryParams()["id"]);
  const [user, setUser] = useState("{}");
  const [changeUser, setChangeUser] = useState("{}");
  const [changeFlag, setChangeFlag] = useState(false);
  const [userPhoto, setUserPhoto] = useState("./images/users/no_file.jpg");
  function getUser() {
    return JSON.parse(changeUser);
  }
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`http://localhost:5000/dashboard?id=${id}`, {
      method: "GET", // метод запроса
      headers: {
        "Content-Type": "application/json", // тип данных, отправляемых на сервер
      },
    })
      .then((response) => response.json()) // обработка ответа от сервера
      .then((data) => {
        console.log(JSON.stringify(data.user));
        if (data.status === 200) {
          setUser(JSON.stringify(data.user));
          setChangeUser(JSON.stringify(data.user));
        } else {
          alert("Пользователь не найден");
          navigate(`/login`);
        }
      })
      .then(() => {
        // задаем картинку пользователя
        let photoPath =
          "./images/users/" +
          (getUser().email ? getUser().email.split("@")[0] : "no_file") +
          ".jpg";
        haveFileInPath(photoPath, () => setUserPhoto(photoPath));
      });
  }, [id, user]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Отправка данных на сервер
    fetch(`http://localhost:5000/dashboard`, {
      method: "POST", // метод запроса
      headers: {
        "Content-Type": "application/json", // тип данных, отправляемых на сервер
      },
      body: JSON.stringify({ user: getUser() }),
    })
      .then((response) => response.json()) // обработка ответа от сервера
      .then((data) => {
        console.log(JSON.stringify(data.user));
        if (data.status === 200) {
          setUser(JSON.stringify(data.user));
          setChangeUser(JSON.stringify(data.user));
        } else {
          alert("Пользователь не найден");
          navigate(`/login`);
        }
      });
    setChangeFlag(false);
    document.querySelectorAll("input").forEach((el) => {
      el.readOnly = true;
    });
    document.querySelector("textarea").readOnly = true;
  };
  function changeButton() {
    // изменение данных
    setChangeFlag(true);
    document.querySelectorAll("input").forEach((el) => {
      el.readOnly = false;
    });
    document.querySelector("textarea").readOnly = false;
  }
  function changeData(key, value) {
    let changed = getUser();
    changed[key] = value;
    changed = JSON.stringify(changed);
    setChangeUser(changed);
  }
  function cancel() {
    // отмена изменения данных
    setChangeFlag(false);
    setChangeUser(user);
    document.querySelectorAll("input").forEach((el) => {
      el.readOnly = true;
    });
    document.querySelector("textarea").readOnly = true;
  }
  return (
    <div className='profile'>
      <NavigationMenu isAuth={!!id} />
      <div className='container'>
        <h1>
          Приветствуем, {getUser().first_name + " " + getUser().last_name}!
        </h1>
        <div className='content'>
          <div className='user-image'>
            <img src={userPhoto} alt='ваше фото' />
          </div>
          <form className='user-data' onSubmit={handleSubmit}>
            <div>
              <p htmlFor='username'>Username:</p>
              <input
                type='text'
                id='username'
                value={getUser().username}
                readOnly
                onChange={(event) =>
                  changeData(event.target.id, event.target.value)
                }
              />
            </div>
            <div>
              <p htmlFor='password'>Password:</p>
              <input
                type='password'
                id='password'
                value={getUser().password}
                readOnly
                onChange={(event) =>
                  changeData(event.target.id, event.target.value)
                }
              />
            </div>
            <div>
              <p htmlFor='last_name'>Фамилия:</p>
              <input
                type='text'
                id='last_name'
                value={getUser().last_name || "N/A"}
                readOnly
                onChange={(event) =>
                  changeData(event.target.id, event.target.value)
                }
              />
            </div>
            <div>
              <p htmlFor='first_name'>Имя:</p>
              <input
                type='text'
                id='first_name'
                value={getUser().first_name}
                readOnly
                onChange={(event) =>
                  changeData(event.target.id, event.target.value)
                }
              />
            </div>
            <div>
              <p htmlFor='about'>О себе:</p>
              <textarea
                type='textarea'
                id='about'
                value={getUser().about || "N/A"}
                readOnly
                onChange={(event) =>
                  changeData(event.target.id, event.target.value)
                }
              />
            </div>
            {changeFlag ? (
              <>
                <button className='rebutton' onClick={cancel}>
                  Отмена
                </button>
                <button className='button' type='submit'>
                  Сохранить
                </button>
              </>
            ) : (
              <button className='button' onClick={changeButton}>
                Изменить
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
