// Parses through local storage to apply buttons
let cities = JSON.parse(localStorage.getItem("locations"));
if (!cities) {
    cities = [];
} else {
    for (let i = 0; i < cities.length; i++){
        let searchedCityEl = document.createElement("button")
        searchedCityEl.setAttribute("class", "searched-city list-group-item list-group-item-action text-center border border-info border-2 shadow");
        searchedCityEl.setAttribute("style", "font-family: 'Oswald', sans-serif;font-size: 20px; font-weight: 300")
        searchedCityEl.innerText = cities[i];
        document.querySelector(".history").appendChild(searchedCityEl);
    }
}

var cardEl = document.querySelectorAll(".weather")

const apiKey = `d08a795d9cdd7f108bc04f749cd0193c`

function getLocation (location) {
    var geocodeUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${apiKey}&limit=1`

    fetch (geocodeUrl)
    .then(response => response.json())
    .then(data => {
        var lat = data[0].lat // retrieves latitude
        var lon = data[0].lon // retrieves longitude
        let location = data[0].name
        getWeather(lat, lon, location);
    })
}

getLocation("Atlanta");

// Selects all weather cards
var cardEl = document.querySelectorAll(".weather")

function getWeather(lat, lon, location) {
    // URL used to fetch weather for 5 days
    var weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial&units=imperial`

    fetch (weatherUrl)
    .then(response => response.json())
    .then(data => {
        // Captures Data for weather
        var date = data.list

        // Keeps count of elements (dates)
        var x = 0
        // debugger
        var cityEl = document.querySelector(".city")
        cityEl.innerHTML = location.toUpperCase()
        cityEl.setAttribute("style", " position: absolute; bottom: 30%; left: 42%; font-family: 'Oswald', sans-serif; font-size: 40px; ")
        // Loops through all the data, and adds values to weather card elemets
        for(i=0; i < date.length; i += 8){
            cardEl[x].setAttribute(`class`, `text-center align-self-center mt-3 mb-3`)
            cardEl[x].setAttribute("style", "font-family: 'Oswald', sans-serif; font-weight: 300")
            var day = moment().add(x,`d`).format("M/D/YYYY") // Today's date
            var icon = date[i].weather[0].icon; // Weather Icon
            var temp = date[i].main.temp; // Tempature
            var wind = date[i].wind.speed; // Wind Speed
            var humid = date[i].main.humidity;// Humidity

            cardEl[x].children[0].innerHTML = day; // Adds value to 'day' class's element
            cardEl[x].children[0].setAttribute("style", "font-family: 'Oswald', sans-serif;")
            cardEl[x].children[1].innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@2x.png">` // Adds value to 'icon' class's element
            cardEl[x].children[2].innerHTML = `Temp: ${temp} °F` // Adds value to 'temp' class's element
            cardEl[x].children[3].innerHTML = `Wind: ${wind} MPH` // Adds value to 'wind' class's element
            cardEl[x].children[4].innerHTML = `Humidity: ${humid} %` // Adds value to 'humid' class's element

            x++ // Increments the date
        }   
        document.querySelector(".icon").setAttribute("src", `http://openweathermap.org/img/wn/${icon}@2x.png`)
        if (cities.includes(location) === false){
            if (cities.length < 6){
                cities.unshift(location)
                localStorage.setItem("locations", JSON.stringify(cities))
            } else {
                cities.pop()
                cities.unshift(location)
                localStorage.setItem("locations", JSON.stringify(cities))
            }
        }
        });
}

$("form").submit(function (event){
    event.preventDefault();
    let city = $(this).find("#location").val();
 
    getLocation(city)
})

$("#search-btn").click(function (event){
    event.preventDefault();
    let city = $("#location").val();
  
    getLocation(city)
    
})

$(".searched-city").click(function (event){
    event.preventDefault();
    let city = $(this).html();
  
    getLocation(city)
    
})