const weatherApp = {}
const cityInput = document.getElementById('city-in')
const searchBtn = document.querySelector('.search-btn')
const weatherDisplayDiv = document.querySelector('.weather-display')
const weatherImg = weatherDisplayDiv.querySelector('img')
const weatherDescription = document.querySelector('.weather-descript')
const tempDisplay = document.querySelector('.temp')
const tempSensedDisplay = document.querySelector('.sensed-temp')
const pressureDisplay = document.querySelector('.pressure')
const humidityDisplay = document.querySelector('.humidity')
const windDisplay = document.querySelector('.wind')
const windDirDisplay = document.querySelector('.wind-direction')
const tempUnitToggle = document.querySelector('.temp-toggle')
let Celsius = ' ºC'
let Fahrenheit = ' F'
let tempUnit = Celsius;

async function getWeather(city = 'Krakow') {
  try {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},pl&units=metric&APPID=3a9bfc72412a8f1e5528cd7b61cf524d`, {mode: 'cors'});
    const weatherData = await response.json();
    const imgId = await weatherData.weather[0].icon;
    weatherImg.src = `http://openweathermap.org/img/wn/${imgId}@2x.png`
    // img.src = catData.data.images.original.url;
    handleWeatherApp(weatherData);
  }
  catch {
    return console.error(err);
  }
}

getWeather();
// console.log('script')

function handleWeatherApp(data) {
  console.log(data);
// cityDisplay.innerHTML = cityInput.value
// weatherImg.src = data.weather[0].icon;
weatherDescription.innerHTML = data.weather[0].main + ', ' + (data.weather[0].description);
tempDisplay.innerHTML = data.main.temp + tempUnit;
tempSensedDisplay.innerHTML = data.main.feels_like + tempUnit;
pressureDisplay.innerHTML = data.main.pressure + ' hPa';
humidityDisplay.innerHTML = data.main.humidity + ' %';
windDisplay.innerHTML = data.wind.speed + ' m/s, ';
windDirDisplay.innerHTML = data.wind.deg;

  console.log(data.weather[0].icon);
  console.log(data.main.feels_like);
  console.log(data.main.temp);
  console.log(data.main.humidity);
  console.log(data.main.pressure);
  console.log(data.main.temp_min);
  console.log(data.main.temp_max);
  console.log(data.weather[0].main);
  console.log(data.weather[0].description);
  console.log(data.wind.speed);
  console.log(data.wind.deg);

}

function handleTempUnit() {
  if (tempUnitToggle.checked === true) {
    tempUnit = Fahrenheit;
  } else {
    tempUnit = Celsius;
  }
}
searchBtn.addEventListener('click', () => { getWeather(cityInput.value)})

