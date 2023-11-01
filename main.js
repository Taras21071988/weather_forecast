import conditions from "./conditions.js";

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
function showCard({ name, country, temp, condition, imgPath }) {
  removeCard();
  const html = `
  <div class="card">
      <h2 class="card-city">${name} <span>${country}</span></h2>

      <div class="card-weather">
          <div class="card-value">${temp}<sup>°c</sup></div>

          <img class="card-img" src="${imgPath}" alt="Weather" />
      </div>
      <div class="card-desc">${condition}</div>
  </div>
  `;
  renderCard(html);
}

async function getWeather(city) {
  const apiKey = "789bcf6e3a4847ceaed81634233010";
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data;
}

//Слушаем отправку с формы
form.onsubmit = async function (e) {
  //Отменяем отправку формы
  e.preventDefault();
  let city = input.value.trim();
  const data = await getWeather(city);

  if (data.error) {
    showError();
  } else {
    const info = conditions.find(
      (obj) => obj.code === data.current.condition.code
    );
    console.log(info);
    console.log(info.languages[23]["day_text"]);

    const weatherPath =
      "./img/" + (data.current.is_day ? "day" : "night") + "/";
    const weatherName = (data.current.is_day ? info.day : info.night) + ".png";
    const imgPath = weatherPath + weatherName;
    console.log(weatherPath + weatherName);

    const condition = data.current.is_day
      ? info.languages[23]["day_text"]
      : info.languages[23]["night_text"];

    const weatherData = {
      name: data.location.name,
      country: data.location.country,
      temp: data.current.temp_c,
      condition: condition,
      imgPath,
    };

    showCard(weatherData);
  }
};
