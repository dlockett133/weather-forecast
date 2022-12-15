// Parses through local storage to apply buttons
let cities = JSON.parse(localStorage.getItem("locations"));
if (!cities) {
    // Confirms if there are any values in local storage, if not we create an array to store the values.
    cities = [];
} else {
    // Loops through local storage and creates a button(s) with the value each item in the object-array
    for (let i = 0; i < cities.length; i++){
        let searchedCityEl = document.createElement("button")
        searchedCityEl.setAttribute("class", "searched-city list-group-item list-group-item-action text-center border border-info border-2 shadow");
        searchedCityEl.setAttribute("style", "font-family: 'Oswald', sans-serif;font-size: 20px; font-weight: 300")
        searchedCityEl.innerText = cities[i];
        document.querySelector(".history").appendChild(searchedCityEl);
    }
}

// API KEY
const apiKey = `d08a795d9cdd7f108bc04f749cd0193c`

// Function calls API to retrieve cordinates (longitude and latitude) based of the input/argument of location parameter
function getLocation (location) {
    let geocodeUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${apiKey}&limit=1`

    fetch (geocodeUrl)
    .then(response => response.json())
    .then(data => {
        let lat = data[0].lat // retrieves latitude
        let lon = data[0].lon // retrieves longitude
        let location = data[0].name // retrieves location's name

        // Inserts created variables as arguments for function
        getWeather(lat, lon, location);
    })
}

// Sets initial weather forecast location to be Atlanta WOHOO!!
getLocation("Atlanta");

// Selects all weather cards
let cardEl = document.querySelectorAll(".weather")

// Function invoked to fetch weather for 5 days
function getWeather(lat, lon, location) {
    // URL used to fetch weather for 5 days
    let weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial&units=imperial`

    fetch (weatherUrl)
    .then(response => response.json())
    .then(data => {
        // Captures Data for weather
        let date = data.list

        // Keeps count of elements (dates)
        let x = 0

        // Selects element with city id
        let cityEl = document.querySelector(".city")
        // Inserts value of 'location' argument into the cityEl
        cityEl.innerHTML = location.toUpperCase()
        cityEl.setAttribute("style", " position: absolute; bottom: 30%; left: 42%; font-family: 'Oswald', sans-serif; font-size: 40px; ")

        // Loops through all the data, and adds values to weather card elemets
        for(i=0; i < date.length; i += 8){
            cardEl[x].setAttribute(`class`, `text-center align-self-center mt-3 mb-3`)
            cardEl[x].setAttribute("style", "font-family: 'Oswald', sans-serif; font-weight: 300")
            let day = moment().add(x,`d`).format("M/D/YYYY") // Today's date
            let icon = date[i].weather[0].icon; // Weather Icon
            let temp = date[i].main.temp; // Tempature
            let wind = date[i].wind.speed; // Wind Speed
            let humid = date[i].main.humidity;// Humidity

            cardEl[x].children[0].innerHTML = day; // Adds value to 'day' class's element
            cardEl[x].children[0].setAttribute("style", "font-family: 'Oswald', sans-serif;")
            cardEl[x].children[1].innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@2x.png">` // Adds value to 'icon' class's element
            cardEl[x].children[2].innerHTML = `Temp: ${temp} °F` // Adds value to 'temp' class's element
            cardEl[x].children[3].innerHTML = `Wind: ${wind} MPH` // Adds value to 'wind' class's element
            cardEl[x].children[4].innerHTML = `Humidity: ${humid} %` // Adds value to 'humid' class's element

            x++ // Increments the date
        }
        // Grabs icon of the weather for the "Present Day"
        let icon = date[0].weather[0].icon
        // Inserts image based of the icon/weather of the "Present Day" in the <marquee>   
        document.querySelector(".icon").setAttribute("src", `http://openweathermap.org/img/wn/${icon}@2x.png`)

        // If searched location is not in the array(local storage), it is inserted into the local storage
        if (cities.includes(location) === false){
            // Confirms if length/amount of buttons/items in array are less than 6
            if (cities.length < 6){

                // Adds location to front of the array
                cities.unshift(location) 
                 // Adds updated array to local storage
                localStorage.setItem("locations", JSON.stringify(cities))
                // Creates button for searched locations
                let searchedCityEl = document.createElement("button")
                searchedCityEl.setAttribute("class", "searched-city list-group-item list-group-item-action text-center border border-info border-2 shadow");
                searchedCityEl.setAttribute("style", "font-family: 'Oswald', sans-serif;font-size: 20px; font-weight: 300")
                searchedCityEl.innerText = location;
                // Adds new created button to top of the "list of buttons"
                document.querySelector(".history").prepend(searchedCityEl);
            } else {
                // If length/amount of buttons/items in array are equal to or more than 6

                // Removes first item/location from array
                cities.pop() 
                // Adds location to front of the array
                cities.unshift(location) 
                // Adds updated array to local storage
                localStorage.setItem("locations", JSON.stringify(cities)) 
                // Selects all searched location buttons
                let buttonEl = document.querySelectorAll(".searched-city")
                // Removes the last button in the "list of buttons"
                buttonEl[5].remove();
                // Creates button for searched locations
                let searchedCityEl = document.createElement("button")
                searchedCityEl.setAttribute("class", "searched-city list-group-item list-group-item-action text-center border border-info border-2 shadow");
                searchedCityEl.setAttribute("style", "font-family: 'Oswald', sans-serif;font-size: 20px; font-weight: 300")
                searchedCityEl.innerText = location;
                // Adds new created button to top of the "list of buttons"
                document.querySelector(".history").prepend(searchedCityEl); 
            }
        }
        });
}

// Creates event listener for <form> element
$("form").submit(function (event){
    event.preventDefault();
    // Retrieves value from input
    let city = $(this).find("#location").val();
 
    if (city.length === 0) {
        alert("Submit valid location")
    }else {
         // Inserts value from input as an argument to invoke the function
        getLocation(city)
    }
})

// Creates event listener for search button
$("#search-btn").click(function (event){
    event.preventDefault();
    // Retrieves value from input
    let city = $("#location").val();
  
    if (city.length === 0) {
        alert("Submit valid location")
    }else {
        // Inserts value from input as an argument to invoke the function
        getLocation(city)
    }
    
})

// Creates event listener for searched location buttons
$(".searched-city").click(function (event){
    event.preventDefault();
    // Retrieves value from button
    let city = $(this).html();
    // Inserts value from input as an argument to invoke the function
    getLocation(city)
    
})