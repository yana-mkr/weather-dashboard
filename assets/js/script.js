var searchInput = ("#search-input").value
var searchButton =("#search-button");

var todaysWeather = function (location) {
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=81054108cea086276c96966b6bf32e1c"

    fetch(apiURL)
    .then(function (response) {
        if(response.ok) {
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

var submitLocation = function(searchInput) {
    event.preventDefault();
    searchButton.eventListener("click", todaysWeather, getForecast)
    console.log(searchInput)
}
//todaysWeather("salt lake city");
//getForecast("salt lake city");

// in my onclick call both function with the city name

// function to display the uv index

// api request and creates elements on the page

// search value box function -- get the value from the search box (querySelector.value)

