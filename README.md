# weather-forecast

## Description

This is site is for anyone in need of a "straight to the point" 5 Day Weather Forecast. It provides the dates and weather for 5 days, starting with the present day of the user.
I hope you enjoy!

Check out the site here: https://dlockett133.github.io/weather-forecast/

## Usage

This site's UX/UI is fairly simple, for usage all you have to do is type in the name of a valid location/city and watch the API calls do their magic 🪄 ✨!

You will see 5 dates/weather cards generate the weather for the next 5 days (including the present day).

Once a location is searched, its value is saved to the local storage and will generate a button to the left side of the screen with the name of the location. This button will allow you to regenerate the weather for locations you previously searched.

After you have searched up to 6 locations, any further searched locations will be placed at top of the button list while removing the last button in the list as well.

![Screen Capture of Weather Forecast Application](./Assets/images/weather-forecast-screen-capture.gif)

## Resources

Tools used:

- Moment.js
- Openweathermap API
- Bootstrap Framework
- Google Fonts
