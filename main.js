// Получаем название города из формы

const form = document.querySelector("#form");
const input = document.querySelector("#inputCity");
let city;

//Слушаем отправку с формы

form.onsubmit = function (e) {
  //Отменяем отправку формы

  e.preventDefault();
  //Получаем значение из input, с помощью trim() - обрезаем пробелы

  city = input.value.trim();

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
      console.log(data.current.temp_c);
      console.log(data.location.name);
      console.log(data.location.country);
    });


};
