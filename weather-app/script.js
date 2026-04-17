const API_KEY = "02c7837fe442f453ad1d8fbdb36baffe";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const statusText = document.getElementById("status");

searchBtn.addEventListener("click", getWeather);

async function getWeather() {
  const city = cityInput.value.trim();
  if (!city) {
    statusText.textContent = "Please enter a city name.";
    return;
  }

  statusText.textContent = "Loading weather data...";

  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
    const data = await res.json();

    if (data.cod !== 200) {
      statusText.textContent = data.message;
      return;
    }

    document.getElementById("location").textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById("temp").textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById("description").textContent = data.weather[0].description;
    document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById("wind").textContent = `Wind: ${data.wind.speed} m/s`;
    statusText.textContent = "Updated successfully.";
  } catch (error) {
    statusText.textContent = "Something went wrong.";
  }
}