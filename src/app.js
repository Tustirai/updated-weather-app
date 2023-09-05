function updateDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
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
  updateDate(response.data.dt);
  console.log(response);
}

let livelocation = document.querySelector("#location-search");
livelocation.addEventListener("click", function () {
  navigator.geolocation.getCurrentPosition(function (position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let key = "9ca6fftf31a653429384425b05bobb8e";
    let units = "metric";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${key}&units=${units}`;
    axios.get(apiUrl).then(function (response) {
      updateLocation(response);
      updateDate(response.data.time);
    });
  });
});

function showJohannesburg() {
  let query = "Johannesburg";
  let key = "9ca6fftf31a653429384425b05bobb8e";
  let units = "metric";
  let url = `https://api.shecodes.io/weather/v1/current?query=${query}&key=${key}&units=${units}`;

  axios.get(url).then(function (response) {
    updateLocation(response);
    updateDate(response.data.time);
  });
}

showJohannesburg();
