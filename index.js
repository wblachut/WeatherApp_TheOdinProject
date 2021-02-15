/* eslint-disable no-shadow */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-use-before-define */
const applyLocationBtn = document.querySelector('.apply-loc-btn');
const cityInput = document.getElementById('city-in');
const searchBtn = document.querySelector('.search-btn');
const locationDisplay = document.querySelector('.location-txt');
const weatherDisplayDiv = document.querySelector('.weather-display');
const weatherImg = weatherDisplayDiv.querySelector('img');
const weatherDescription = document.querySelector('.weather-descript');
const tempDisplay = document.querySelector('.temp');
const tempSensedDisplay = document.querySelector('.sensed-temp');
const pressureDisplay = document.querySelector('.pressure');
const humidityDisplay = document.querySelector('.humidity');
const windDisplay = document.querySelector('.wind');
const windDirImg = document.querySelector('.wind-direction');
const tempUnitElements = document.querySelectorAll('.temp-unit');
const tempUnitToggle = document.querySelector('.temp-toggle');
const citySlide = document.querySelector('.city-slide');
const celsius = ' ºC';
const fahrenheit = ' F';
let tempUnit = celsius;
let data;

const celsiusToFahrenheit = (cels) => (cels * 9) / 5 + 32;
const fahrenheitToCelsius = (fahr) => ((fahr - 32) * 5) / 9;

async function getWeather(city = 'Krakow') {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},pl&units=metric&APPID=3a9bfc72412a8f1e5528cd7b61cf524d`,
      { mode: 'cors' }
    );
    const weatherData = await response.json();
    handleWeatherApp(weatherData);
  } catch {
    (function (err) {
      console.log(err);
    });
  }
}

function getWeatherByLocation() {
  navigator.geolocation.getCurrentPosition(
    applyWeatherFromLocation,
    console.log('get user location')
  );

  function applyWeatherFromLocation(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&&units=metric&APPID=3a9bfc72412a8f1e5528cd7b61cf524d`
    )
      .then((response) => response.json())
      .then((data) => handleWeatherApp(data));
  }
}

function handleWeatherApp(data) {
  console.log(data);

  const imgId = data.weather[0].icon;
  weatherImg.src = `https://openweathermap.org/img/wn/${imgId}@2x.png`;
  weatherDescription.innerHTML = `${data.weather[0].main}, ${data.weather[0].description}`;
  tempDisplay.innerHTML = Math.round(data.main.temp);
  tempSensedDisplay.innerHTML = Math.round(data.main.feels_like);
  pressureDisplay.innerHTML = `${data.main.pressure} hPa`;
  humidityDisplay.innerHTML = `${data.main.humidity} %`;
  windDisplay.innerHTML = `${data.wind.speed} m/s, `;
  const windDisplayedDeg = data.wind.deg - 90;
  windDirImg.style.transform = `rotate(${windDisplayedDeg}deg)`;
  locationDisplay.innerHTML = `${data.name}, ${data.sys.country}`;
  handleTempUnit('entry');
}

function handleTempUnit(mode = 'defaultMode') {
  if (tempUnitToggle.checked) {
    tempUnit = fahrenheit;
    if (mode === 'entry') {
      console.log('fetching with fahrenheit', data);
      tempDisplay.innerHTML = Math.round(
        celsiusToFahrenheit(tempDisplay.innerHTML)
      );
      tempSensedDisplay.innerHTML = Math.round(
        celsiusToFahrenheit(tempSensedDisplay.innerHTML)
      );
      handleTempUnit();
    }
  } else {
    tempUnit = celsius;
  }
  tempUnitElements[0].innerHTML = tempUnit;
  tempUnitElements[1].innerHTML = tempUnit;
}

function enableCityInput() {
  console.log('show input');
  cityInput.classList.add('active');
  cityInput.focus();
  citySlide.classList.remove('active');
}

function disableCityInput() {
  if (cityInput.value === '') {
    cityInput.value = '';
    cityInput.classList.remove('active');
    citySlide.classList.add('active');
  }
}

getWeatherByLocation();

citySlide.addEventListener('click', () => {
  enableCityInput();
});
applyLocationBtn.addEventListener('click', () => {
  getWeatherByLocation();
  disableCityInput();
});

searchBtn.addEventListener('click', () => {
  getWeather(cityInput.value);
});

tempUnitToggle.addEventListener('change', function handleTempSwitch() {
  if (tempUnitToggle.checked) {
    console.log('Checkbox is checked..');
    tempUnit = fahrenheit;
    console.log(tempUnit);
    console.log(celsiusToFahrenheit(tempDisplay.innerHTML));
    tempDisplay.innerHTML = Math.round(
      celsiusToFahrenheit(tempDisplay.innerHTML)
    );
    tempSensedDisplay.innerHTML = Math.round(
      celsiusToFahrenheit(tempSensedDisplay.innerHTML)
    );
    handleTempUnit();
  } else {
    tempUnit = celsius;
    console.log('Checkbox is not checked..');
    console.log(tempUnit);
    console.log(fahrenheitToCelsius(tempDisplay.innerHTML));
    tempDisplay.innerHTML = Math.round(
      fahrenheitToCelsius(tempDisplay.innerHTML)
    );
    tempSensedDisplay.innerHTML = Math.round(
      fahrenheitToCelsius(tempSensedDisplay.innerHTML)
    );
    handleTempUnit();
  }
});

cityInput.addEventListener('keyup', function handleEnterLookup(e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    getWeather(cityInput.value);
  } else {
    e.preventDefault();
    if (cityInput.value === '' && cityInput !== document.activeElement) {
      setInterval(disableCityInput(), 1000);
    }
  }
});
