console.log("Client side js file is loaded!");

const getWeather = (location) => {
  messageOne.textContent = "Loading...";
  fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        renderWeatherData(data);
      } else {
        renderWeatherData(data);
      }
    });
  });
};

const messageOne = document.getElementById("message-1");
const messageTwo = document.getElementById("message-2");

const renderWeatherData = (data) => {
  if (data.error) {
    messageOne.textContent = data.error;
    messageTwo.textContent = "";
  } else {
    messageOne.textContent = data.address;
    messageTwo.textContent =
      "Temperature: " + data.forecast.Temperature + " | " + "Precipitation: " + data.forecast.Precipitation + " | " + "Weather: " + data.forecast.Weather;
  }
};

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  getWeather(location);
});
