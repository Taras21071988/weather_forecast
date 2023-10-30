const apiKey = "789bcf6e3a4847ceaed81634233010";


// http://api.weatherapi.com/v1/current.json?key=789bcf6e3a4847ceaed81634233010&q=London

const query = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Kharkiv`;

fetch(query)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  });

