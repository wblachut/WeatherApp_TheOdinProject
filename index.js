const weatherApp = {}
const applyLocationBtn = document.querySelector('.apply-loc-btn')
const cityInput = document.getElementById('city-in')
const searchBtn = document.querySelector('.search-btn')
const locationDisplay = document.querySelector('.location-txt')
const weatherDisplayDiv = document.querySelector('.weather-display')
const weatherImg = weatherDisplayDiv.querySelector('img')
const weatherDescription = document.querySelector('.weather-descript')
const tempDisplay = document.querySelector('.temp')
const tempSensedDisplay = document.querySelector('.sensed-temp')
const pressureDisplay = document.querySelector('.pressure')
const humidityDisplay = document.querySelector('.humidity')
const windDisplay = document.querySelector('.wind')
const windDirImg = document.querySelector('.wind-direction')
const tempUnitElements = document.querySelectorAll('.temp-unit')
const tempUnitToggle = document.querySelector('.temp-toggle')
const citySlide = document.querySelector('.city-slide')

let celsius = ' ºC'
let fahrenheit = ' F'
let tempUnit = celsius;

const celsiusToFahrenheit = celsius => celsius * 9/5 + 32;
const fahrenheitToCelsius = fahrenheit => (fahrenheit - 32) * 5/9;


async function getWeather(city = 'Krakow') {
  try {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},pl&units=metric&APPID=3a9bfc72412a8f1e5528cd7b61cf524d`, {mode: 'cors'});
    const weatherData = await response.json();
    handleWeatherApp(weatherData);
  }
  catch {
    (function (err) {
      console.log(err);
    });
  }
}

// getWeather();
getWeatherByLocation();
// handleTempUnit();
// console.log('script')

function handleWeatherApp(data) {
  console.log(data);
  const imgId = data.weather[0].icon;
  weatherImg.src = `http://openweathermap.org/img/wn/${imgId}@2x.png`
  weatherDescription.innerHTML = data.weather[0].main + ', ' + (data.weather[0].description);
  tempDisplay.innerHTML = Math.round(data.main.temp);
  tempSensedDisplay.innerHTML = Math.round(data.main.feels_like);
  pressureDisplay.innerHTML = data.main.pressure + ' hPa';
  humidityDisplay.innerHTML = data.main.humidity + ' %';
  windDisplay.innerHTML = data.wind.speed + ' m/s, ';
  windDisplayedDeg = data.wind.deg - 90;
  windDirImg.style.transform = `rotate(${windDisplayedDeg}deg)`;
  locationDisplay.innerHTML = `${data.name}, ${data.sys.country}`;

  console.log(data.weather[0].icon);
  console.log(data.main);
  console.log(data.weather[0].main);
  console.log(data.weather[0].description);
  console.log(data.wind);
  console.log(data.name, data.sys.country);
  console.log(data.clouds.all);

}

function getWeatherByLocation() {
  navigator.geolocation.getCurrentPosition(applyWeatherFromLocation, console.error('cannot get user location'))

  function applyWeatherFromLocation(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    console.log(position.coords)
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&&units=metric&APPID=3a9bfc72412a8f1e5528cd7b61cf524d`)
      .then(response => response.json())
      .then(data => handleWeatherApp(data));
  }
}

function handleTempUnit() {
  console.log('temp')
  // if (tempUnit === celsius) {
  //   tempUnit = fahrenheit;

  //   // handleWeatherApp(data);
  // } else {
  //   tempUnit = celsius;
  //   // handleWeatherApp(data);
  // }
  tempUnitElements[0].innerHTML = tempUnit;
  tempUnitElements[1].innerHTML = tempUnit;
}

citySlide.addEventListener('click',() => { enableCityInput()});
applyLocationBtn.addEventListener('click', () => {
  getWeatherByLocation();
  disableCityInput();
});
searchBtn.addEventListener('click', () => { getWeather(cityInput.value)});
tempUnitToggle.addEventListener('change', handleTempUnit());

cityInput.addEventListener('keyup', function handleEnterLookup(e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    getWeather(cityInput.value);  
  }
  if (cityInput.value === '' && cityInput.focus === false) {
    setInterval(disableCityInput(), 1000);
  }
});





function enableCityInput() {
  console.log('show input')
  cityInput.classList.add('active');
  cityInput.focus();
  citySlide.classList.remove('active');
}

function disableCityInput() {
  if (cityInput.value === '' ) {
  cityInput.value = '';
  cityInput.classList.remove('active');
  citySlide.classList.add('active');
  }
}