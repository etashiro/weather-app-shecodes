let currentTime = document.querySelector("#current-date");
let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[now.getDay()];

let currentHours = now.getHours();
if (currentHours < 10) {
  currentHours = `0${currentHours}`;
}

let currentMinutes = now.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}

currentTime.innerHTML = `${currentDay} ${currentHours}:${currentMinutes}`;

function displaySearchedCityInfo(response) {
  document.querySelector("h1").innerHTML = response.data.city;

  document.querySelector("#temp-today").innerHTML = Math.round(
    response.data.temperature.current
  );

  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;

  document.querySelector("#wind-speed").innerHTML = response.data.wind.speed;

  document.querySelector("#weather-description").innerHTML =
    response.data.condition.description;
}

function getWeatherInfo(event) {
  event.preventDefault();

  let apiKey = "34386e004af6ea0365btbb6ff72e0aoe";
  let cityName = document.querySelector("#searched-city").value;
  let units = "imperial";

  let weatherUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}&units=${units}`;

  axios.get(weatherUrl).then(displaySearchedCityInfo);
}

function getDefaultInfo() {
  let apiKey = "34386e004af6ea0365btbb6ff72e0aoe";
  let units = "imperial";
  let cityLat = 34.052235;
  let cityLon = -118.243683;

  let weatherUrl = `https://api.shecodes.io/weather/v1/current?lon=${cityLon}&lat=${cityLat}&key=${apiKey}&units=${units}`;

  axios.get(weatherUrl).then(displaySearchedCityInfo);
}

getDefaultInfo();

let searchForm = document.querySelector("#city-search-form");
searchForm.addEventListener("submit", getWeatherInfo);

function showUserPosition(position) {
  let cityLat = position.coords.latitude;
  let cityLon = position.coords.longitude;

  let apiKey = "34386e004af6ea0365btbb6ff72e0aoe";
  let units = "imperial";

  let weatherUrl = `https://api.shecodes.io/weather/v1/current?lon=${cityLon}&lat=${cityLat}&key=${apiKey}&units=${units}`;

  axios.get(weatherUrl).then(displaySearchedCityInfo);
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showUserPosition);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrentLocation);
