var curForecast;
var fiveForecast = [];
var searchBtn = $('.search');
var city;

// Check current weather
function getCurrentWeather(){
  var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&exclude=hourly,minutely&units=imperial&appid=b04d17a1b02b4977fbc6a49af4c0395d'
  fetch(requestUrl)
    .then(function (response) {
      console.log(response);
      return response.json()
    })
    .then(function (data) {
      console.log(data)
      console.log("Temp: " + data.main.temp + " F");
      console.log("Humidity: " + data.main.humidity + " %");
      console.log("Wind speed: " + data.wind.speed + " mph");
      //weather icon. Use http://openweathermap.org/img/wn/{icon}.png
      console.log(data.weather[0].icon);
      $('#cityName').text(data.name);
      $('#condition').attr('src', 'http://openweathermap.org/img/wn/'+ data.weather[0].icon +'.png');
      $('#temp').text("Temp: " + data.main.temp + " °F")
      $('#wind').text("Wind: " + data.wind.speed + " mph");
      $('#humidity').text('Humidity: ' + data.main.humidity + " %");
      // UV Index possibly depricated from Open Weather
      // console.log(data.main.temp); 
    });
}

// // Index for for 5 day forcast every 8: (var i = 1, i <= 5, i++) day = (i*8) -1
// var forecastUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial&appid=b04d17a1b02b4977fbc6a49af4c0395d'
// fetch(forecastUrl)
//   .then(function (response) {
//     console.log(response);
//     return response.json();
//   })
//   .then( function(data) {
//     console.log(data);
//   });

  function getCity(e) {
    city = $('.city').val();
    getCurrentWeather();
  }

  searchBtn.on('click', getCity);