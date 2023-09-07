function showJohannesburg() {
  let query = "Johannesburg";
  let key = "9ca6fftf31a653429384425b05bobb8e";
  let units = "metric";
  let url = `https://api.shecodes.io/weather/v1/current?query=${query}&key=${key}&units=${units}`;
  axios.get(url).then(function (response) {
    updateLocation(response);
  });
}

function updateDate(time) {
  let date = new Date(time * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let day = date.getDay();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let currentTime = hours + ":" + minutes + " " + ampm;
  let currentMonth = months[date.getMonth()];
  document.querySelector(
    "#live-date"
  ).innerHTML = `${currentMonth} | ${days[day]} | ${currentTime} `;
}

function updateLocation(response) {
  document.querySelector("#live-City").innerHTML = response.data.city;

  let temperature = Math.round(response.data.temperature.current);
  document.querySelector("#live-Temp").innerHTML = `${temperature}`;

  document.querySelector("#live-description").innerHTML =
    response.data.condition.description.charAt(0).toUpperCase() +
    response.data.condition.description.slice(1);

  document.querySelector(
    "#liveHumidity"
  ).innerHTML = `Humidity: ${response.data.temperature.humidity}%`;

  document.querySelector(
    "#liveWind"
  ).innerHTML = `Wind: ${response.data.wind.speed} m/s`;

  let iconElement = document.querySelector("#live-weather-icon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.icon);
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  if (forecast) {
    forecast.forEach(function (forecastDay, index) {
      if (index < 5) {
        forecastHTML =
          forecastHTML +
          `
          <div class="col-sm-4" id="weatherForecastDay">${updateDate(
            forecastDay.time
          )} </div>

        <div class="col-sm-4">
          <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
            forecastDay.condition.icon
          }.png" id="forecastIcon" alt=" " />          
        </div>

        <div class="col-sm-4" id="forecastTemp">
               ${Math.round(forecastDay.temperature.day)}℃ </dsiv>`;
      }
    });
  } else {
    forecastHTML = `<div class="col-sm-12">No forecast available 🙊 </div>`;
  }
  forecastHTML += `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let livelocation = document.querySelector("#live-location-search");
livelocation.addEventListener("click", function () {
  navigator.geolocation.getCurrentPosition(function (position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let key = "9ca6fftf31a653429384425b05bobb8e";
    let units = "metric";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${key}&units=${units}`;
    axios.get(apiUrl).then(function (response) {
      updateLocation(response);
    });
  });
});

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let query = document.querySelector(".searchInput").value;
  let key = "9ca6fftf31a653429384425b05bobb8e";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${query}&key=${key}&units=${units}`;
  axios.get(apiUrl).then(function (response) {
    updateLocation(response);
  });
});

showJohannesburg();
