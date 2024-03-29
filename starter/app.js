//API key for OpenWeatherMap
const apiKey = "638c78e571f99b62fecd141059d59224";

// Event listener for the search button click event
document
  .getElementById("search-btn")
  .addEventListener("click", function (event) {
    event.preventDefault();
    fetchAndDisplayWeather();
  });

// Default city set to London
document.addEventListener("DOMContentLoaded", function () {
  const defaultCity = document.getElementById("city-input").value || "London";
  // Set the input field value to the default city
  document.getElementById("city-input").value = defaultCity;

  // Fetch and display weather for the default city
  fetchAndDisplayWeather();
});

// Function to fetch and display weather
function fetchAndDisplayWeather() {
  const cityName = document.getElementById("city-input").value;

  // URLs for the current weather and forecast APIs
  const currentWeatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;
  const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`;
  // Fetch and handle the current weather data
  fetch(currentWeatherApiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Extract relevant data from the current weather response
      const currentTemperature = data.main.temp;
      const currentWindSpeed = data.wind.speed;
      const currentHumidity = data.main.humidity;
      const currentCity = data.name;
      const weatherIcon = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}.png`;
      // Create and append weather icon element
      const weatherIconElement = document.createElement("img");
      weatherIconElement.src = iconUrl;
      const today = new Date();
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      const formattedToday = today.toLocaleDateString(undefined, options);

      // Update the current weather display
      document.getElementById(
        "current-search-term"
      ).textContent = `${currentCity} (Today: ${formattedToday})`;
      document
        .getElementById("current-search-term")
        .appendChild(weatherIconElement);
      document.getElementById(
        "current-temp"
      ).textContent = `${currentTemperature}°F`;
      document.getElementById(
        "current-wind"
      ).textContent = `${currentWindSpeed} m/s`;
      document.getElementById(
        "current-humidity"
      ).textContent = `${currentHumidity}%`;
    })
    .catch((error) => {
      console.error("Error fetching current weather:", error);
    });

  // Fetch and handle the forecast data
  fetch(forecastApiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const forecastData = [];

      // Process the forecast data
      for (let i = 2; i <= data.list.length; i += 8) {
        const forecastDay = data.list[i];
        forecastData.push(forecastDay);
      }
      // Clear the forecast container
      const forecastContainer = document.getElementById("forecast-container");
      forecastContainer.innerHTML = "";

      forecastData.forEach((forecastDay, index) => {
        const box = document.createElement("div");
        box.classList.add("box");
        const content = document.createElement("div");
        content.classList.add("content");
        const dateElement = document.createElement("h4");
        const iconElement = document.createElement("img");
        const ulElement = document.createElement("ul");

        const dateArray = forecastDay.dt_txt.split(" ");
        const forecastDate = dateArray[0];
        const forecastTemperature = forecastDay.main.temp;
        const forecastWindSpeed = forecastDay.wind.speed;
        const forecastHumidity = forecastDay.main.humidity;

        dateElement.textContent = forecastDate;
        const forecastIconCode = forecastDay.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${forecastIconCode}.png`;

        iconElement.src = iconUrl;
        ulElement.innerHTML = `
          <li>Temp: <span>${forecastTemperature}°F</span></li>
          <li>Wind: <span>${forecastWindSpeed} m/s</span></li>
          <li>Humidity: <span>${forecastHumidity}%</span></li>
        `;

        content.appendChild(dateElement);
        content.appendChild(iconElement);
        content.appendChild(ulElement);
        box.appendChild(content);
        forecastContainer.appendChild(box);
      });
    })
    .catch((error) => {
      console.error("Error fetching 5-day forecast:", error);
    });
}
