var searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
// var searchBtn = $('.search');
var citiesBtn = $('.cities');
var city;
var today = moment();
var forecastCard = $('.card-body')
var searchHistoryUl = $('#history');

// If user has any data in local storage display it on page
if (searchHistory.length > 0) {
  for(var i = 0; i < searchHistory.length; i++) {
      var newLi = $('<li>');
      var newBtn = $('<button>');

      newLi.addClass("list-group-item");      
      newBtn.addClass("btn btn-primary btn-lg btn-block mt-2")
      newBtn.text(searchHistory[i]);

      newLi.append(newBtn);
      searchHistoryUl.append(newLi);
  }
}

// Check current weather
function getCurrentWeather(){
  var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&exclude=hourly,minutely&units=imperial&appid=b04d17a1b02b4977fbc6a49af4c0395d'
  fetch(requestUrl)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
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

  function getCity(e) {
    if (e.target === $('.search')[0]){
      city = $('.city').val();
    } else {
      city = $(e.target).text();
    }
    
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

      localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }    
  }

citiesBtn.on('click', 'button', getCity);