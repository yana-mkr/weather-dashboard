var searchInput = document.getElementById("search-input")
var searchButton = document.getElementById("search-button")
var forecastCards = document.getElementById("forecast-cards")
var cityToday = document.querySelector("#city-today")
var todayStats = document.querySelector("#today-stats")
var temp = document.querySelector("#temp")
var wind = document.querySelector("#wind")
var humidity = document.querySelector("#humidity")
var uvIndex = document.querySelector("#uv-index")
var searchedCities = JSON.parse(localStorage.getItem("searched")) || []
var savedSearch = document.querySelector("#saved-search")

var makeList = function (searched) {
    var listItem = document.createElement("li")
    listItem.setAttribute("class", "list-group-item list-group-item-action")
    listItem.textContent = searched
    savedSearch.append(listItem)
}


var todaysWeather = function (location) {
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=81054108cea086276c96966b6bf32e1c&units=imperial"

    fetch(apiURL)
        .then(function (response) {
            if (response.ok) {
                //console.log(response);
                response.json().then(function (data) {

                    if (searchedCities.indexOf(searchInput.value) === -1) {
                        searchedCities.push(searchInput.value)
                        localStorage.setItem("searched", JSON.stringify(searchedCities))
                        makeList(searchInput.value);
                    }

                    var h1 = document.createElement("h1")
                    h1.textContent = searchInput.value + " " + new Date().toLocaleDateString()

                    cityToday.appendChild(h1);
                    var img = document.createElement("img")
                    img.setAttribute("src", "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png")
                    h1.appendChild(img)

                    var pTemp = document.createElement("p")
                    pTemp.textContent = "Temperature: " + data.main.temp + " °F"
                    temp.appendChild(pTemp);

                    var pWind = document.createElement("p")
                    pWind.textContent = "Wind: " + data.wind.speed + " MPH"
                    wind.appendChild(pWind);
                    console.log(data);

                    var pHum = document.createElement("p")
                    pHum.textContent = "Humidity: " + data.main.humidity + "%"
                    humidity.appendChild(pHum);

                    getUV(data.coord.lat, data.coord.lon)
                })
            }
        })
}

// var lon = data.coord.lon
// var lat = data.coord.lat

var getUV = function (lat, lon) {
    var apiURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&&appid=81054108cea086276c96966b6bf32e1c"
    console.log(lon, lat)
    fetch(apiURL)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    //console.log(data);

                    var btn = document.createElement("button")
                    if (data.value < 3) {
                        btn.classList.add("btn-success")
                    } else if (data.value < 7) {
                        btn.classList.add("btn-warning")
                    } else {
                        btn.classList.add("btn-danger")
                    }
                    btn.textContent = data.value
                    uvIndex.appendChild(btn);
                })
            }
        })
}

var getForecast = function (location) {
    var apiURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + location + "&appid=81054108cea086276c96966b6bf32e1c&units=imperial"

    fetch(apiURL)
        .then(function (response) {
            if (response.ok) {
                // console.log(response);
                // https://usefulangle.com/post/143/pure-javascript-append
                response.json().then(function (data) {
                    console.log(data)
                    for (var i = 0; i < data.list.length; i++) {
                        if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
                            var card = "<div class=\"card col\"><div class\"card-title\">" + new Date(data.list[i].dt_txt).toLocaleDateString() + "</div>"
                                + "<img src='http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png'" + "/>"
                                + "<div>Temp: " + data.list[i].main.temp + " °F</div>"
                                + "<div>Wind " + data.list[i].wind.speed + " MPH</div>"
                                + "<div>Humidity " + data.list[i].main.humidity + "%</div></div>"
                            forecastCards.insertAdjacentHTML('beforeend', card)
                        }
                    }
                })
            }
        })
}

searchButton.addEventListener("click", function (event) {
    event.preventDefault()
    temp.innerHTML = ""
    wind.innerHTML = ""
    humidity.innerHTML = ""
    uvIndex.innerHTML = ""
    forecastCards.innerHTML = ""
    cityToday.innerHTML = ""

    todaysWeather(searchInput.value)
    getForecast(searchInput.value)


})

