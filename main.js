//Получаем элементы на странице

const form = document.querySelector("#form");
const input = document.querySelector("#inputCity");
const header = document.querySelector("#header");

//Слушаем отправку с формы

form.onsubmit = function (e) {
  //Отменяем отправку формы

  e.preventDefault();
  //Получаем значение из input, с помощью trim() - обрезаем пробелы

  let city = input.value.trim();

  //Делаем запрос на сервер для получения данных

  const apiKey = "789bcf6e3a4847ceaed81634233010"; //Ключ для Api
  //Адрес запроса
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
  //Выполняем запрос
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      //Проверка на ошибки при вводе
      if (data.error) {
        alert("Город введен не верно");
      }

      //Oтображаем полученные даныые на странице

      //Удаляем предыдущую карточку
      const prevCard = document.querySelector(".card");

      if (prevCard) prevCard.remove();
      //Разметка для карточки с погодой

      const html = `
    <div class="card">
        <h2 class="card-city">${data.location.name} <span>${
        data.location.country
      }</span></h2>

        <div class="card-weather">
            <div class="card-value">${data.current.temp_c.toFixed()}<sup>°c</sup></div>

            <img class="card-img" src="./img/example.png" alt="Weather" />
        </div>
        <div class="card-desc">${data.current.condition.text}</div>
    </div>
      `;

      //Отображение карточки с погодой на странице
      header.insertAdjacentHTML("afterend", html);
    });
};
