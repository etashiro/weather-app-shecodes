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

  farenheitTemp = response.data.temperature.current;

  document.querySelector("#temp-today").innerHTML = Math.round(
    response.data.temperature.current
  );

  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;

  document.querySelector("#wind-speed").innerHTML = response.data.wind.speed;

  document.querySelector("#weather-description").innerHTML =
    response.data.condition.description;

  document
    .querySelector("#weather-icon")
    .setAttribute("src", response.data.condition.icon_url);
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

function displayCelsiusTemp(event) {
  event.preventDefault();

  farenheitConversion.classList.remove("active");
  celsiusConversion.classList.add("active");

  celsiusTemp = ((farenheitTemp - 32) * 5) / 9;
  document.querySelector("#temp-today").innerHTML = Math.round(celsiusTemp);
}

function displayFarenheitTemp(event) {
  event.preventDefault();

  farenheitConversion.classList.add("active");
  celsiusConversion.classList.remove("active");

  document.querySelector("#temp-today").innerHTML = Math.round(farenheitTemp);
}

let farenheitTemp = null;

let searchForm = document.querySelector("#city-search-form");
searchForm.addEventListener("submit", getWeatherInfo);

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrentLocation);

let celsiusConversion = document.querySelector("#celsius-link");
celsiusConversion.addEventListener("click", displayCelsiusTemp);

let farenheitConversion = document.querySelector("#farenheit-link");
farenheitConversion.addEventListener("click", displayFarenheitTemp);

getDefaultInfo();
