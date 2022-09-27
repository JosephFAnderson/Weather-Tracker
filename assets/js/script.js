var searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
var citiesBtn = $('.cities');
var city;
var searchHistoryUl = $('#history');

// If user has any data in local storage display it to history
if (searchHistory.length > 0) {
  for(var i = 0; i < searchHistory.length; i++) {
      var newLi = $('<li>');
      var newBtn = $('<button>');
      var newI = $('<i>');

      newLi.addClass("list-group-item searchList");      
      newBtn.addClass("btn btn-lg btn-block pastCity")
      newI.addClass("fas fa-trash delete");
      newBtn.text(searchHistory[i]);
      
      newLi.append(newBtn);
      newLi.append(newI);
      searchHistoryUl.append(newLi);
  };
}

// Fetch current weather data for requested city
function getCurrentWeather(){
  var cwUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&exclude=hourly,minutely&units=imperial&appid=b04d17a1b02b4977fbc6a49af4c0395d'
  fetch(cwUrl)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {      
      var today = moment();
      $('#cityName').text(data.name);
      $('#curDate').text(today.format('M[/]D[/]YYYY'));
      $('#condition').attr('src', 'https://openweathermap.org/img/wn/'+ data.weather[0].icon +'.png');
      $('#temp').text("Temp: " + data.main.temp + " °F")
      $('#wind').text("Wind: " + data.wind.speed + " mph");
      $('#humidity').text('Humidity: ' + data.main.humidity + " %");
      // UV Index possibly depricated from Open Weather
      // console.log(data.main.temp); 
    });
}

// Fetch 5-day / 3 hour weather data for requested city
function getForecastWeather() {
  var fcUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial&appid=b04d17a1b02b4977fbc6a49af4c0395d'
  fetch(fcUrl)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function(data) {
      console.log(data);
      var forecastCard = $('.card-body');
      for(var i = 1; i <=5; i++) {
        
        /*
         Data returns weather in 3 hour increments. 
         Multiply index by 8 to increment in 24 hour increments. 
         -1 to try and get initial pull around same time of day as current time 
        */
        var forecastIndex = (i*8)-1;
        var tempToday = moment();
        var weatherDate = tempToday.add(i, 'd').format('M[/]D[/]YYYY');
        var forecastDay = $(forecastCard[i-1]).children()[0];
        var forecastIcon = $(forecastCard[i-1]).children()[1];
        var forecastTemp = $(forecastCard[i-1]).children()[2];
        var forecastWind = $(forecastCard[i-1]).children()[3];
        var forecastHumidity = $(forecastCard[i-1]).children()[4];

        $(forecastDay).text(weatherDate);
        $(forecastIcon).attr('src', 'https://openweathermap.org/img/wn/'+ data.list[forecastIndex].weather[0].icon +'.png')
        $(forecastTemp).text("Temp: " + data.list[forecastIndex].main.temp + " °F");
        $(forecastWind).text("Wind: " + data.list[forecastIndex].wind.speed + " mph");
        $(forecastHumidity).text('Humidity: ' + data.list[forecastIndex].main.humidity + " %");

      }
    });
}

  /* 
   Handles the delete history button click
   This is outside the scope of the assignment
   However, for practice purposes I implemented it. 
   */
  function deleteCity(e) {
    var btnTar = $(e.target).siblings()[0]
    var delCity = $(btnTar).text();
    var delEl = $(e.target).parent()[0];

    searchHistory.splice(searchHistory.indexOf(delCity), 1);    
    $(delEl).remove()
    
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }

  // Handle Search and History button clicks
  function getCity(e) {

    // If they click the search button pull info from input, otherwise grab text of history button
    if (e.target === $('.search')[0]){
      city = $('.city').val();
      $('.city').val("");

      // If user searched a city not in history, then create a new button and add it to history then update local storage
      if(!searchHistory.includes(city)){
        searchHistory.unshift(city);
        var newLi = $('<li>');
        var newBtn = $('<button>');
        var newI = $('<i>');
  
        newLi.addClass("list-group-item searchList");      
        newBtn.addClass("btn btn-lg btn-block pastCity")
        newI.addClass("fas fa-trash delete");
        newBtn.text(city);
      
        newLi.append(newBtn);
        newLi.append(newI);
        searchHistoryUl.prepend(newLi);
  
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
      }  
    } else {
      city = $(e.target).text();
    }

    // Makes sure the weather elements are visible. Defaulted to hidden on page load.
    var weatherEl = $('.weather');
    weatherEl.css('visibility', 'visible');

    getForecastWeather();
    getCurrentWeather();      
  }

citiesBtn.on('click', 'button', getCity); 
citiesBtn.on('click', 'i', deleteCity);