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
var today = document.getElementById("today")

// search history
var makeList = function (searched) {
    var listItem = document.createElement("button")
    listItem.textContent = searched
    savedSearch.append(listItem)
    listItem.setAttribute("class", "btn btn-secondary save")


    listItem.addEventListener("click",
        function () {
            todaysWeather(searched);
            getForecast(searched)

            temp.innerHTML = ""
            wind.innerHTML = ""
            humidity.innerHTML = ""
            uvIndex.innerHTML = ""
            forecastCards.innerHTML = ""
            cityToday.innerHTML = ""
        })
}
// loop for search history
for (var i = 0; i < searchedCities.length; i++) {
    makeList(searchedCities[i])
}

// pulls top weather card for today 
var todaysWeather = function (location) {
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=81054108cea086276c96966b6bf32e1c&units=imperial"

    fetch(apiURL)
        .then(function (response) {
            if (response.ok) {
                //console.log(response);
                response.json().then(function (data) {

                    if (searchedCities.indexOf(location) === -1) {
                        searchedCities.push(location)
                        localStorage.setItem("searched", JSON.stringify(searchedCities))
                        makeList(location);
                    }

                    var h2 = document.createElement("h2")
                    h2.textContent = location + " " + new Date().toLocaleDateString()
                    cityToday.appendChild(h2);

                    var img = document.createElement("img")
                    img.setAttribute("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png")
                    h2.appendChild(img)

                    var pTemp = document.createElement("p")
                    pTemp.textContent = "Temperature: " + data.main.temp + " ??F"
                    temp.appendChild(pTemp);

                    var pWind = document.createElement("p")
                    pWind.textContent = "Wind: " + data.wind.speed + " MPH"
                    wind.appendChild(pWind);
                    console.log(data);

                    var pHum = document.createElement("p")
                    pHum.textContent = "Humidity: " + data.main.humidity + "%"
                    humidity.appendChild(pHum);

                    getUV(data.coord.lat, data.coord.lon)
                    searchInput.value = ""

                    today.classList.add("card-1")

                })
            } else {
                alert("Error: Location not found. Please enter a valid city name and try again.");
            }
        })
}

// gets the uv index and colors it
var getUV = function (lat, lon) {
    var apiURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&&appid=81054108cea086276c96966b6bf32e1c"
    //console.log(lon, lat)
    fetch(apiURL)
        .then(function (response) {
            if (response.ok) {
                //console.log(response);
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
                    btn.textContent = "UV: " + data.value
                    btn.classList.add("uv")
                    uvIndex.appendChild(btn);
                })
            }
        })
}

// dynamically creates 5 forecast cards
var getForecast = function (location) {
    var apiURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + location + "&appid=81054108cea086276c96966b6bf32e1c&units=imperial"

    fetch(apiURL)
        .then(function (response) {
            if (response.ok) {
                // console.log(response);
                // https://usefulangle.com/post/143/pure-javascript-append
                response.json().then(function (data) {
                    //console.log(data)
                    forecastCards.innerHTML += "<div class='h4'>" + "5-Day Forecast:" + "</div>"
                    for (var i = 0; i < data.list.length; i++) {
                        if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
                            var card = "<div class=\"card col card border-secondary text-info\"><div class\"card-title\">" + new Date(data.list[i].dt_txt).toLocaleDateString() + "</div>"
                                + "<img src='https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png'" + "/>"
                                + "<div>Temp: " + data.list[i].main.temp + " ??F</div></br>"
                                + "<div>Wind: " + data.list[i].wind.speed + " MPH</div></br>"
                                + "<div>Humidity: " + data.list[i].main.humidity + "%</div></div>"
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

