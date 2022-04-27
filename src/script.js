// current date and time///
let now = new Date();

let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
let currentDay = days[now.getDay()];

let currentHour = now.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
let currentMinutes = now.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}

let todayIs = `${currentDay} | ${currentHour}:${currentMinutes}`;
let dateAndTime = document.querySelector(".date-Now");

dateAndTime.innerHTML = todayIs;

// search city //
function displayWeatherCondition(response) {
  console.log(response.data);
  document.querySelector(".searched-city").innerHTML = response.data.name;
  document.querySelector(".temp-now").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#windSpeed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weatherDescription").innerHTML =
    response.data.weather[0].description;
}

function searchCity(city) {
  let apiKey = "49b0d838d550d9b7e859b7302af4e85c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
// start to search for city//
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let searchInput = document.querySelector("#search-form");
searchInput.addEventListener("submit", handleSubmit);

// Current Button//

function searchLocation(position) {
  let apiKey = "49b0d838d550d9b7e859b7302af4e85c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function displayCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#currentButton");
currentLocationButton.addEventListener("click", displayCurrentLocation);

// C & F link change////
function changeCelsius(event) {
  let cTemp = document.querySelector(".temp-now");
  event.preventDefault();
  cTemp.innerHTML = "21";
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", changeCelsius);

function changeFahrenheit(event) {
  let fTemp = document.querySelector(".temp-now");
  event.preventDefault();
  fTemp.innerHTML = "67";
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", changeFahrenheit);
searchCity("Madrid");
