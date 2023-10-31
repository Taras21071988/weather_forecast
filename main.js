//Получаем элементы на странице

const form = document.querySelector("#form");
const input = document.querySelector("#inputCity");
const header = document.querySelector("#header");

//Функция рендера карточки на странице
function renderCard(html) {
  header.insertAdjacentHTML("afterend", html);
}

//Функция удаления предыдущей карточки
function removeCard() {
  const prevCard = document.querySelector(".card");
  if (prevCard) prevCard.remove();
}

//Карточка с ошибкой

function showError() {
  removeCard();
  const html = ` <div class="card"><h3 class ="card__error">Город введен не верно</h3></div>`;
  renderCard(html);
}

//Карточка с погодой
function showCard(name, country, temp, condition) {
  removeCard();
  const html = `
  <div class="card">
      <h2 class="card-city">${name} <span>${country}</span></h2>

      <div class="card-weather">
          <div class="card-value">${temp.toFixed()}<sup>°c</sup></div>

          <img class="card-img" src="./img/example.png" alt="Weather" />
      </div>
      <div class="card-desc">${condition}</div>
  </div>
  `;
  renderCard(html);
}

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
        //Если есть ошибка то выводим её
        //Отображение карточки с ошибкой
        showError();
      } else {
        //Oтображаем полученные даныые на странице

        //Функция отображения карточки с погодой
        showCard(
          data.location.name,
          data.location.country,
          data.current.temp_c,
          data.current.condition.text
        );
      }
    });
};
