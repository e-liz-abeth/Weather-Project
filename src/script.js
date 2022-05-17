// current date and time///
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let day = days[date.getDay()];
  return `${day} | ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

//  city temp //
function displayWeatherCondition(response) {
  let cityElement = document.querySelector(".searched-city");
  let temperature = document.querySelector(".temp-now");
  let dateAndTime = document.querySelector(".date-Now");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#windSpeed");
  let descriptionElement = document.querySelector("#weatherDescription");
  let iconElement = document.querySelector("#weatherIcon");

  celsiusTemperature = response.data.main.temp;

  cityElement.innerHTML = response.data.name;
  temperature.innerHTML = Math.round(celsiusTemperature);
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  descriptionElement.innerHTML = response.data.weather[0].description;
  dateAndTime.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
// start to search for city//
function searchCity(city) {
  let apiKey = "49b0d838d550d9b7e859b7302af4e85c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

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
  event.preventDefault();
  let cTemp = document.querySelector(".temp-now");
  cTemp.innerHTML = Math.round(celsiusTemperature);
}

function changeFahrenheit(event) {
  event.preventDefault();

  let fahrenheit = (celsiusTemperature * 9) / 5 + 32;
  let fTemp = document.querySelector(".temp-now");
  fTemp.innerHTML = Math.round(fahrenheit);
}
let celsiusTemperature = null;

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", changeCelsius);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", changeFahrenheit);

searchCity("Madrid");
