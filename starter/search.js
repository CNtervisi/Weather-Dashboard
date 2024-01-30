// Get references to various DOM elements
const form = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const historyList = document.getElementById("history");
const searchBtn = document.getElementById("search-btn");

// Retrieve stored search terms from local storage
const searchArray = JSON.parse(localStorage.getItem("SearchTerms")) || [];

// Function to update the history list
function updateHistoryList() {
  historyList.innerHTML = "";

  // Loop through each term in the search array
  searchArray.forEach(function (term) {
    // Create a new list item for each term
    const listItem = document.createElement("li");
    listItem.textContent = term;

    // Add a click event listener to each list item
    listItem.addEventListener("click", function () {
      // When clicked, populate the city input field with the selected term
      cityInput.value = term;

      // Call the fetchAndDisplayWeather function to update the weather data
      fetchAndDisplayWeather();
    });

    // Append the list item to the history list
    historyList.appendChild(listItem);
  });
}

// Call the updateHistoryList function to initially populate the history list
updateHistoryList();

// Maximum number of items to store in the history list
const MAX_HISTORY_ITEMS = 8;

// Add a click event listener to the search button
searchBtn.addEventListener("click", function (event) {
  // Prevent the form from being submitted
  event.preventDefault();

  // Get the city name from the input field
  const cityName = cityInput.value;

  // Add the city name to the beginning of the search array
  searchArray.unshift(cityName);

  // If the search array has more than MAX_HISTORY_ITEMS items, remove the last item
  if (searchArray.length > MAX_HISTORY_ITEMS) {
    searchArray.pop();
  }

  // Store the updated search array in local storage
  localStorage.setItem("SearchTerms", JSON.stringify(searchArray));

  // Clear the city input field
  cityInput.value = "";

  // Update the history list
  updateHistoryList();
});
