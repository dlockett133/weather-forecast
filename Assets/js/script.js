const cities = [];
var cardEl = document.querySelectorAll(".weather")

const apiKey = `d08a795d9cdd7f108bc04f749cd0193c`

function getLocation (location) {
    var geocodeUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${apiKey}&limit=1`

    fetch (geocodeUrl)
    .then(response => response.json())
    .then(data => {
        var lat = data[0].lat // retrieves latitude
        var lon = data[0].lon // retrieves longitude
        let location = data[0].name
        getWeather(lat, lon, location);
    })

    
}

// Selects all weather cards
var cardEl = document.querySelectorAll(".weather")

function getWeather(lat, lon, location) {
    // URL used to fetch weather for 5 days
    var weatherUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial&units=imperial`

    fetch (weatherUrl)
    .then(response => response.json())
    .then(data => {
        // Captures Data for weather
        var date = data.list

        // Keeps count of elements (dates)
        var x = 0
        debugger
        document.querySelector(".city").innerHTML = location
        // Loops through all the data, and adds values to weather card elemets
        for(i=0; i < date.length; i += 8){
            cardEl[x].setAttribute(`class`, `align-self-center`)
            var day = moment().add(x,`d`).format("M/D/YYYY") // Today's date
            var icon = date[i].weather[0].icon; // Weather Icon
            var temp = date[i].main.temp; // Tempature
            var wind = date[i].wind.speed; // Wind Speed
            var humid = date[i].main.humidity;// Humidity

            cardEl[x].children[0].innerHTML = day; // Adds value to 'day' class's element
            cardEl[x].children[1].innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@2x.png">` // Adds value to 'icon' class's element
            cardEl[x].children[2].innerHTML = `Temp: ${temp} °F` // Adds value to 'temp' class's element
            cardEl[x].children[3].innerHTML = `Wind: ${wind} MPH` // Adds value to 'wind' class's element
            cardEl[x].children[4].innerHTML = `Humidity: ${humid} %` // Adds value to 'humid' class's element

            x++ // Increments the date
        }   
        
        });
}

// var location = $("#location");

$("form").submit(function (event){
    event.preventDefault();
    let city = $(this).find("#location").val();
    if (cities.includes(city) === false){
        cities.push(city)
        localStorage.setItem("locations", JSON.stringify(cities))
    }
    getLocation(city)
})

$("button").click(function (event){
    event.preventDefault();
    let city = $("#location").val();
    if (cities.includes(city) === false){
        cities.push(city)
        localStorage.setItem("locations", JSON.stringify(cities))
    }
    getLocation(city)
    
})