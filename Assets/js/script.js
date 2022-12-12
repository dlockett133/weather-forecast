// Grab first API to get location cordinates (lon, latitiude)

// Grad second API to get weather for 5 days
    // Date (moment.js UTC conversion)
    // Icon
    // Temp
    // Wind
    // Humidity
    var dateFormat = moment().format("M/D/YYYY") // Add UTC

    const apiKey = `d08a795d9cdd7f108bc04f749cd0193c`
    var geocodeAPI = `http://api.openweathermap.org/geo/1.0/direct?q=&appid=${apiKey}&limit=1`
    var weatherAPI = `api.openweathermap.org/data/2.5/forecast?lat=&lon=&appid=${apiKey}&units=imperial&cnt=7&units=imperial`