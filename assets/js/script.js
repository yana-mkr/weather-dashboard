var searchInput = document.getElementById("search-input")
var searchButton = document.getElementById("search-button")
var cardText = document.querySelector(".card-text")
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
                todayStats.createElement("p")
                
                console.log(data);
            })
        }
    })
}

var getForecast = function(location) {
    var apiURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + location + "&appid=81054108cea086276c96966b6bf32e1c"

    fetch(apiURL)
    .then(function(response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function(data) {
                //1. get the icon from the data (weather element) data.list[0].weather.icon
                //2. build the image url by concatenating the icon
                //3. create the img element
                //4. assing src to the url created in step 2
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
