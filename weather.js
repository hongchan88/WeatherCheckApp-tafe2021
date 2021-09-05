const COORDS = "coords";
const API_KEY = "9781cf557ef09d2de48ac872bc251ff5";
const weahter = document.querySelector(".js-weather");

const WeatherBtn = document.querySelector(".WeatherBtn");
const GpsBtn = document.querySelector(".GpsBtn");
const GpsResult = document.querySelector(".GpsResult");

let cordsobj = {
  latitude: null,
  longitude: null,
};

WeatherBtn.addEventListener("click", getWeather);
GpsBtn.addEventListener("click", loadCoords);

function getWeather() {
  console.log(cordsobj.latitude);
  if ((cordsobj.longitude === null) | (cordsobj.latitude === null)) {
    alert("Please get your GPS first");
  } else {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${cordsobj.latitude}&lon=${cordsobj.longitude}&appid=${API_KEY}&units=metric`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        console.log(json);
        const temp = json.main.temp;
        const place = json.name;
        const forecast = json.weather[0].description;
        weahter.innerText = `You are in ${place} and ${temp} degree  . ${forecast}`;
      });
  }
}

function saveCords(cordsobj) {
  localStorage.setItem(COORDS, JSON.stringify(cordsobj));
}

function handleGeoSucces(position) {
  console.log(position);
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  cordsobj = {
    latitude,
    longitude,
  };

  GpsResult.innerHTML = `<p> You are in <br> Latitude : ${cordsobj.latitude} <br> Longitutde: ${cordsobj.longitude} <p> `;
}

function handleGeoError() {
  console.log("fail");
}

function askCords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
  console.log("suvvv");
}

function loadCoords() {
  if (cordsobj.longitude === null || cordsobj.latitude === null) {
    askCords();
  } else {
    GpsResult.innerHTML = `<p> You are in <br> Latitude : ${cordsobj.latitude} <br> Longitutde: ${cordsobj.longitude} <p> `;
    // getWeather(parsed.latitude , parsed.longitude);
  }
}
