// Grab first API to get location cordinates (lon, latitiude)

// Grad second API to get weather for 5 days
    // Date (moment.js UTC conversion)
    // Icon
    // Temp
    // Wind
    // Humidity
var dateFormat = moment().format("M/D/YYYY") // Add UTC

const apiKey = `d08a795d9cdd7f108bc04f749cd0193c`

function getLocation (city) {
    var geocodeUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}&limit=1`

    fetch (geocodeUrl)
    .then(response => response.json())
    .then(data => {
        var lat = data[0].lat // retrieves latitude
        var lon = data[0].lon // retrieves longitude
    })

    
}

function getWeather(lat, lon) {
    var weatherUrl = `api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial&cnt=7&units=imperial`

}
