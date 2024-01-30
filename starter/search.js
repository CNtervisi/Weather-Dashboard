const form = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const historyList = document.getElementById("history");
const searchBtn = document.getElementById("search-btn");

const searchArray = JSON.parse(localStorage.getItem("SearchTerms")) || [];

function updateHistoryList() {
  historyList.innerHTML = "";

  searchArray.forEach(function (term) {
    const listItem = document.createElement("li");
    listItem.textContent = term;
    listItem.addEventListener("click", function () {
      cityInput.value = term;
      fetchAndDisplayWeather();
    });
    historyList.appendChild(listItem);
  });
}

updateHistoryList();

const MAX_HISTORY_ITEMS = 8;

searchBtn.addEventListener("click", function (event) {
  event.preventDefault();

  const cityName = cityInput.value;

  searchArray.unshift(cityName);

  if (searchArray.length > MAX_HISTORY_ITEMS) {
    searchArray.pop();
  }

  localStorage.setItem("SearchTerms", JSON.stringify(searchArray));
  cityInput.value = "";
  updateHistoryList();
});
