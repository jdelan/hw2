let displayError = function(error) {
  console.debug(error);
  window.alert("Sorry, something went wrong.");
}

let getWeather = function(latitude, longitude) {
  // let latitude = '41.8781';
  // let longitude = '-87.6298';

  navigator.geolocation.getCurrentPosition(function(location) {
    console.log("User's latitude is " + location.coords.latitude);
    console.log("User's longitude is " + location.coords.longitude);

    let openweathermap_api_url = 'https://api.openweathermap.org/data/2.5/weather?'
    openweathermap_api_url += 'lat=' + location.coords.latitude
    openweathermap_api_url += '&lon=' + location.coords.longitude
    openweathermap_api_url +='&appid=4ce6f502d38ddae567bf1702b05e168c&units=imperial'

    fetch(openweathermap_api_url).then(convertDataToJSON).then(updateWeather).catch(displayError);
  });
}

// Convert the weather service's raw response into JSON
// (ie. a JavaScript object)
let convertDataToJSON = function(response) {
  return response.json();
}

let updateWeather = function(dataFromService) {
  console.debug(dataFromService)
  city_name = dataFromService.name;
  temp = dataFromService.main.temp;
  icon = dataFromService.weather[0].icon;
  let location = document.getElementById("location");
  location.innerHTML = city_name;
  let weather = document.getElementById("temp_reading");
  weather.innerHTML = "It is " + temp + " degrees outside.";
  document.getElementById("weather_icon").src="http://openweathermap.org/img/w/"+ icon +".png";
}

let weatherLink = document.getElementById("get_forecast")
weatherLink.addEventListener("click", getWeather);

// HINT:
// Weather icon example: http://openweathermap.org/img/w/10d.png
// The very last part ('10d.png') can change based on the current conditions.

console.debug("Some text here");
