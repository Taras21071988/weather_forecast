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

        //Удаляем предыдущую карточку
        removeCard();

        //Отображение карточки с ошибкой
        const html = ` <div class="card"><h3 class ="card__error">Город введен не верно</h3></div>`;
        renderCard(html);
      } else {
        //Oтображаем полученные даныые на странице

        //1 - Удаляем предыдущую карточку
        removeCard();

        //2 - Разметка для карточки с погодой
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

        //3 - Отображение карточки с погодой на странице
        renderCard(html);
      }
    });
};
