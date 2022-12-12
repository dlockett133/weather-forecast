// Grab first API to get location cordinates (lon, latitiude)

// Grad second API to get weather for 5 days
    // Date (moment.js UTC conversion)
    // Icon
    // Temp
    // Wind
    // Humidity
// var dateFormat = moment().format("M/D/YYYY") // Add UTC

var cardEl = document.querySelectorAll(".weather")

const apiKey = `d08a795d9cdd7f108bc04f749cd0193c`

function getLocation (city) {
    var geocodeUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}&limit=1`

    fetch (geocodeUrl)
    .then(response => response.json())
    .then(data => {
        var lat = data[0].lat // retrieves latitude
        var lon = data[0].lon // retrieves longitude

        getWeather(lat, lon);
    })

    
}

var cardEl = document.querySelectorAll(".weather")

function getWeather(lat, lon) {
    var weatherUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial&units=imperial`

    fetch (weatherUrl)
    .then(response => response.json())
    .then(data => {
        var date = data.list
        var x = 0
        // console.log(date)
        for(i=0; i < date.length; i += 8){
            var day = moment().add(x,`d`).format("M/D/YYYY")
            var icon = date[i].weather[0].icon;
            var temp = date[i].main.temp;
            var wind = date[i].wind.speed;
            var humid = date[i].main.humidity;

            cardEl[x].children[0].innerHTML = day;
            cardEl[x].children[1].innerHTML = icon
            cardEl[x].children[2].innerHTML = temp
            cardEl[x].children[3].innerHTML = wind
            cardEl[x].children[4].innerHTML = humid
            x++
        }   
        
        });
}
