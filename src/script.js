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
  document.querySelector("h1").innerHTML = response.data.name;

  document.querySelector("#temp-today").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;

  document.querySelector("#wind-speed").innerHTML = response.data.wind.speed;

  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
}

function getWeatherInfo(event) {
  event.preventDefault();

  let apiKey = "bb0df6985c2eab6a171d64a6bacbb4e1";
  let cityName = document.querySelector("#searched-city").value;
  let units = "imperial";

  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;

  axios.get(weatherUrl).then(displaySearchedCityInfo);
}

function getDefaultInfo() {
  let apiKey = "bb0df6985c2eab6a171d64a6bacbb4e1";
  let units = "imperial";
  let cityLat = 34.052235;
  let cityLon = -118.243683;

  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${cityLat}&lon=${cityLon}&appid=${apiKey}&units=${units}`;

  axios.get(weatherUrl).then(displaySearchedCityInfo);
}

getDefaultInfo();

let searchForm = document.querySelector("#city-search-form");
searchForm.addEventListener("submit", getWeatherInfo);

function showUserPosition(position) {
  let cityLat = position.coords.latitude;
  let cityLon = position.coords.longitude;

  let apiKey = "bb0df6985c2eab6a171d64a6bacbb4e1";
  let units = "imperial";

  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${cityLat}&lon=${cityLon}&appid=${apiKey}&units=${units}`;

  axios.get(weatherUrl).then(displaySearchedCityInfo);
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showUserPosition);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrentLocation);

// Not Used (Reference)
function getSearchedCityInfo(response) {
  cityLat = response.data[0].lat;
  cityLon = response.data[0].lon;

  let apiKey = "bb0df6985c2eab6a171d64a6bacbb4e1";
  let units = "imperial";

  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${cityLat}&lon=${cityLon}&appid=${apiKey}&units=${units}`;

  axios.get(weatherUrl).then(displaySearchedCityInfo);
}
