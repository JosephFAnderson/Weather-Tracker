// Check weather with lon + lat
var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=seoul&exclude=hourly,minutely&units=imperial&appid=b04d17a1b02b4977fbc6a49af4c0395d'
fetch(requestUrl)
  .then(function (response) {
    console.log(response);
    return response.json()
  })
  .then(function (data) {
    console.log(data);
  });


// Index for for 5 day forcast every 8: (var i = 1, i <= 5, i++) day = (i*8) -1
var forecastUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=seoul&units=imperial&appid=b04d17a1b02b4977fbc6a49af4c0395d'
fetch(forecastUrl)
  .then(function (response) {
    console.log(response);
    return response.json();
  })
  .then( function(data) {
    console.log(data);
  });