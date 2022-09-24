var searchHistory = [];
var searchBtn = $('.search');
var city;
var today = moment();
var forecastCard = $('.card-body')
var searchHistoryUl = $('#history');
// console.log($(forecastCard[0]).children());

// Check current weather
function getCurrentWeather(){
  var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&exclude=hourly,minutely&units=imperial&appid=b04d17a1b02b4977fbc6a49af4c0395d'
  fetch(requestUrl)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      // console.log(data)
      console.log("Temp: " + data.main.temp + " F");
      console.log("Humidity: " + data.main.humidity + " %");
      console.log("Wind speed: " + data.wind.speed + " mph");
      //weather icon. Use http://openweathermap.org/img/wn/{icon}.png
      console.log(data.weather[0].icon);
      $('#cityName').text(data.name);
      $('#curDate').text(today.format('M[/]D[/]YYYY'));
      $('#condition').attr('src', 'http://openweathermap.org/img/wn/'+ data.weather[0].icon +'.png');
      $('#temp').text("Temp: " + data.main.temp + " °F")
      $('#wind').text("Wind: " + data.wind.speed + " mph");
      $('#humidity').text('Humidity: ' + data.main.humidity + " %");
      // UV Index possibly depricated from Open Weather
      // console.log(data.main.temp); 
    });
}

function getForecastWeather() {
  // Index for for 5 day forcast every 8: (var i = 1, i <= 5, i++) day = (i*8) -1
  var forecastUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial&appid=b04d17a1b02b4977fbc6a49af4c0395d'
  fetch(forecastUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
      for(var i = 1; i <=5; i++) {
        var forecastIndex = (i*8)-1;
        var tempToday = moment();
        var weatherDate = tempToday.add(i, 'd').format('M[/]D[/]YYYY');
        var forecastDay = $(forecastCard[i-1]).children()[0];
        var forecastIcon = $(forecastCard[i-1]).children()[1];
        var forecastTemp = $(forecastCard[i-1]).children()[2];
        var forecastWind = $(forecastCard[i-1]).children()[3];
        var forecastHumidity = $(forecastCard[i-1]).children()[4];

        $(forecastDay).text(weatherDate);
        $(forecastIcon).attr('src', 'http://openweathermap.org/img/wn/'+ data.list[forecastIndex].weather[0].icon +'.png')
        $(forecastTemp).text("Temp: " + data.list[forecastIndex].main.temp + " °F");
        $(forecastWind).text("Wind: " + data.list[forecastIndex].wind.speed + " mph");
        $(forecastHumidity).text('Humidity: ' + data.list[forecastIndex].main.humidity + " %");

      }
    });
}

// Possible function for on page load search history
// function displayHistory(history) {


//   for (var i = 0; i < history.length; i++) {
//     var newLi = $('<li>');
//     newLi.addClass("list-group-item");
//     var newBtn = $('<button>');
//     newBtn.addClass("btn btn-primary btn-lg btn-block mt-2")

//     newBtn.text(history[i]);
//     newLi.append(newBtn);
//     searchHistoryUl.append(newLi);
//   }
// }

  function getCity(e) {

    city = $('.city').val();
    getForecastWeather();
    getCurrentWeather();

    if(!searchHistory.includes(city)){
      searchHistory.unshift(city);
      var newLi = $('<li>');
      var newBtn = $('<button>');

      newLi.addClass("list-group-item");      
      newBtn.addClass("btn btn-primary btn-lg btn-block mt-2")
      newBtn.text(city);

      newLi.append(newBtn);
      searchHistoryUl.prepend(newLi);
    }    
  }

  searchBtn.on('click', getCity);