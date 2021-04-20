var searchInput = document.getElementById("search-input")
var searchButton = document.getElementById("search-button")
var forecastCards = document.getElementById("forecast-cards")
var cityToday = document.querySelector("#city-today")
var todayStats = document.querySelector("#today-stats")
var uvIndex = document.querySelector("#uv-index")


var todaysWeather = function (location) {
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=81054108cea086276c96966b6bf32e1c"

    fetch(apiURL)
    .then(function (response) {
        if(response.ok) {
            console.log(response);
            response.json().then(function(data) {
                console.log(data);
            })
        }
    })
}

var getForecast = function(location) {
    var apiURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + location + "&appid=81054108cea086276c96966b6bf32e1c&units=imperial"

    fetch(apiURL)
    .then(function(response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function(data) {
                for (var i = 0; i < 5; i++) {
                     var card="<div class=\"card col\"><div class\"card-title\">" + data.list[i].dt_txt + "</div>"
                     +"<img src='http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png'" + "/>"
                     +"<div>Temperature: " + data.list[i].main.temp + "</div>"
                     +"<div>Wind " + data.list[i].wind.speed + "MPH</div>"
                     +"<div>Humidity " + data.list[i].main.humidity + "%</div></div>"
                     forecastCards.insertAdjacentHTML('beforeend', card)
                }            
                console.log(data);
            })
        }
    })
}


searchButton.addEventListener("click", function(event){
  todaysWeather(searchInput.value) 
  getForecast(searchInput.value)

})
    
//todaysWeather("salt lake city");
//getForecast("salt lake city");
