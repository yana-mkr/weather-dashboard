var searchInput = document.getElementById("search-input")
var searchButton = document.getElementById("search-button")
var forecastCards = document.getElementById("forecast-cards")
var cityToday = document.querySelector("#city-today")
var todayStats = document.querySelector("#today-stats")
var temp = document.querySelector("#temp")
var wind = document.querySelector("#wind")
var humidity = document.querySelector("#humidity")
var uvIndex = document.querySelector("#uv-index")



var todaysWeather = function (location) {
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=81054108cea086276c96966b6bf32e1c&units=imperial"

    fetch(apiURL)
    .then(function (response) {
        if(response.ok) {
            //console.log(response);
            response.json().then(function(data) {
                var h1 = document.createElement("h1")
                h1.textContent = searchInput.value
                cityToday.appendChild(h1);

                var pTemp = document.createElement("p")
                pTemp.textContent = "Temperature: " + data.main.temp
                temp.appendChild(pTemp);
                
                var pWind = document.createElement("p")
                pWind.textContent = "Wind: " + data.wind.speed + " MPH"
                wind.appendChild(pWind);
                console.log(data);

                var pHum = document.createElement("p")
                pHum.textContent = "Humidity: " + data.main.humidity + "%"
                humidity.appendChild(pHum);
            })
        }
    })
}

var getForecast = function(location) {
    var apiURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + location + "&appid=81054108cea086276c96966b6bf32e1c&units=imperial"

    fetch(apiURL)
    .then(function(response) {
        if (response.ok) {
           // console.log(response);
            // https://usefulangle.com/post/143/pure-javascript-append
            response.json().then(function(data) {
                for (var i = 0; i < 5; i++) {
                     var card="<div class=\"card col\"><div class\"card-title\">" + data.list[i].dt_txt + "</div>"
                     +"<img src='http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png'" + "/>"
                     +"<div>Temp: " + data.list[i].main.temp + "</div>"
                     +"<div>Wind " + data.list[i].wind.speed + " MPH</div>"
                     +"<div>Humidity " + data.list[i].main.humidity + "%</div></div>"
                     forecastCards.insertAdjacentHTML('beforeend', card)
                }            
               // console.log(data);
            })
        }
    })
}


// var getUV = function(location) {
//     var apiURL ="http://api.openweathermap.org/data/2.5/uvi?lat=&lon=" + location + "&appid=81054108cea086276c96966b6bf32e1c"

//     fetch(apiURL)
//     .then(function(response) {
//         if (response.ok) {
//             console.log(response);
//             response.json().then(function(data) {
//                 console.log(data);
// })}
//     })
// }

searchButton.addEventListener("click", function(event){
  todaysWeather(searchInput.value) 
  getForecast(searchInput.value)

})
    
//todaysWeather("salt lake city");
//getForecast("salt lake city");
